import type { Access, FieldAccess, PayloadRequest } from 'payload'

/**
 * Roles. `admin` manages everything including users; `editor` manages content.
 * `staff` and `member` are reserved for the dashboard and member areas (later phases)
 * and are not selectable yet.
 */
export const ROLES = ['admin', 'editor'] as const
export type Role = (typeof ROLES)[number]

type MaybeUser = PayloadRequest['user']

export const hasRole = (user: MaybeUser, ...roles: Role[]): boolean =>
  Boolean(user && 'role' in user && roles.includes(user.role as Role))

export const isAdmin = (user: MaybeUser) => hasRole(user, 'admin')
export const isStaff = (user: MaybeUser) => hasRole(user, 'admin', 'editor')

// Collection-level access, reused by every collection.
export const anyone: Access = () => true
export const admins: Access = ({ req }) => isAdmin(req.user)
export const editors: Access = ({ req }) => isStaff(req.user)

/** Admins see every user; anyone else signed in sees only themselves. */
export const adminsOrSelf: Access = ({ req }) => {
  if (isAdmin(req.user)) return true
  if (req.user) return { id: { equals: req.user.id } }
  return false
}

/** Public sees published documents only; editors and admins also see drafts. */
export const publishedOrEditors: Access = ({ req }) => {
  if (isStaff(req.user)) return true
  return { _status: { equals: 'published' } }
}

// Field-level access.
export const adminsField: FieldAccess = ({ req }) => isAdmin(req.user)
