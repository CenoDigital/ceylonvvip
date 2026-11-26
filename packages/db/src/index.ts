// Payload writes its generated types to ./payload-types.ts (pnpm --filter web generate:types).
// The empty import makes TypeScript load 'payload' so the generated module augmentation resolves.
import type {} from 'payload'

export type * from './payload-types'
