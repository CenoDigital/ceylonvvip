# syntax=docker/dockerfile:1.7
# Production image for apps/web (Next.js + Payload). Build from the repo root:
#   docker build -f docker/web.Dockerfile -t ceylonvvip-web .

ARG NODE_VERSION=24.22.3
ARG ALPINE_VERSION=3.24

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base
ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH \
    NEXT_TELEMETRY_DISABLED=1
RUN apk add --no-cache libc6-compat && corepack enable
WORKDIR /repo

# 1. Keep only apps/web and the workspace packages it depends on.
FROM base AS pruner
COPY . .
RUN pnpm dlx turbo@2.11.13 prune web --docker

# 2. Install from the pruned lockfile, then build.
FROM base AS builder
COPY --from=pruner /repo/out/json/ ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile
COPY --from=pruner /repo/out/full/ ./
# The build never connects to the database; these placeholders only satisfy config loading.
RUN NODE_ENV=production \
    PAYLOAD_SECRET=build-placeholder \
    DATABASE_URI=postgres://build:build@127.0.0.1:5432/build \
    pnpm turbo run build --filter=web

# 3. Minimal runtime: the standalone server only, running as the unprivileged node user.
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
# The server only needs node itself: drop the bundled package managers and their CVEs.
RUN rm -rf /usr/local/lib/node_modules /usr/local/bin/npm /usr/local/bin/npx \
      /usr/local/bin/corepack /usr/local/bin/yarn /usr/local/bin/yarnpkg /opt/yarn-*
COPY --from=builder --chown=node:node /repo/apps/web/.next/standalone ./
COPY --from=builder --chown=node:node /repo/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=node:node /repo/apps/web/public ./apps/web/public
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
# Payload runs pending migrations on start (prodMigrations in payload.config.ts).
CMD ["node", "apps/web/server.js"]
