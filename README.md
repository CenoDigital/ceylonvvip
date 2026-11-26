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

## Commands

```sh
pnpm install
pnpm dev          # run the app
pnpm lint         # ESLint everywhere
pnpm typecheck    # TypeScript strict everywhere
pnpm test         # unit tests
pnpm build        # production build
pnpm format       # Prettier
pnpm --filter web generate:types   # regenerate packages/db/src/payload-types.ts
```

Local Postgres via Docker and the full CI pipeline arrive in the next pull requests (tasks 137 and 138).
