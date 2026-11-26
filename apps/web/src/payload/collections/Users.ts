import type { CollectionConfig } from 'payload'

// Roles, audit fields and per-role access arrive in Sprint 1 (task 141).
export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email' },
  auth: true,
  fields: [],
}
