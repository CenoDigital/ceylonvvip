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
