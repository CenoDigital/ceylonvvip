# CeylonVVIP

Website for ceylonvvip.com, built by CenoDigital for Gainbuild (Pvt) Ltd.

Turborepo monorepo: Next.js + Payload CMS on PostgreSQL, media on Cloudflare R2, deployed as Docker images to Coolify.

## Requirements

- Node 24.22.3 or newer (see `.nvmrc`)
- pnpm 11 (`corepack enable` picks the pinned version)

## Layout

| Path                  | What it holds                                                                  |
| --------------------- | ------------------------------------------------------------------------------ |
| `apps/web`            | Next.js + Payload (public site, `/admin`, REST and GraphQL API, `/api/health`) |
| `packages/tokens`     | Design tokens from Figma (CSS variables + TS)                                  |
| `packages/ui-brand`   | Front-end design system and GSAP motion presets                                |
| `packages/ui-admin`   | shadcn/ui components for admin views and future dashboards                     |
| `packages/cms-schema` | Shared Payload field groups                                                    |
| `packages/core`       | Domain logic (slugs, booking message builder, pricing display)                 |
| `packages/db`         | Generated Payload types                                                        |
| `packages/validation` | Shared Zod schemas                                                             |
| `packages/config`     | Shared tsconfig and ESLint configs                                             |

Apps import from packages; packages never import from apps.

## Local setup

```sh
corepack enable
pnpm install
cp apps/web/.env.example apps/web/.env   # then set PAYLOAD_SECRET (openssl rand -hex 32)
pnpm services:up                          # Postgres 16 on :54320, S3 storage (RustFS) on :9000, console :9001
pnpm --filter web migrate                 # apply migrations
pnpm dev                                  # http://localhost:3000, admin at /admin
```

## Commands

```sh
pnpm lint         # ESLint everywhere
pnpm typecheck    # TypeScript strict everywhere
pnpm test         # unit tests
pnpm --filter web test:int                # integration tests (needs services:up)
pnpm build        # production build
pnpm format       # Prettier
pnpm --filter web generate:types          # regenerate packages/db/src/payload-types.ts
pnpm --filter web migrate:create <name>   # new migration after a schema change
pnpm services:app # build and run the production image on :3000 against local Postgres
pnpm services:down
```

## Docker

`docker/web.Dockerfile` builds the production image: turbo prune, pnpm install, Next.js standalone output, running as the unprivileged `node` user, with a health check on `/api/health`. Payload applies pending migrations when the server starts (`prodMigrations`); schema push is off everywhere.

`docker/compose.yml` is for local development only. Staging and production run on Coolify from images that already passed CI.

## Deploys

Coolify (cenocloud.cc, project CeylonVVIP) only hosts. GitHub Actions tests and builds the
image, pushes it to `ghcr.io/cenodigital/ceylonvvip-web`, then asks Coolify to deploy.

| Environment | URL                            | How it deploys                                               |
| ----------- | ------------------------------ | ------------------------------------------------------------ |
| Staging     | https://staging.ceylonvvip.com | Automatically after every green push to `main`               |
| Production  | https://ceylonvvip.com         | Manually: Actions, "Deploy to production", type `production` |

Staging sits behind basic auth, and every environment except production sends
`X-Robots-Tag: noindex` (set by `SITE_ENV` in Coolify). Each environment has its own
Postgres 16; migrations run when the app starts. Runtime secrets (`DATABASE_URI`,
`PAYLOAD_SECRET`, storage keys) live only in Coolify. The one GitHub secret is
`COOLIFY_TOKEN`, a deploy-only token.

In Coolify, each app health-checks `GET http://127.0.0.1:3000/api/health`. Use `127.0.0.1`, not
`localhost`: in the Alpine image `localhost` resolves to IPv6 `::1`, which the server does not listen on.
