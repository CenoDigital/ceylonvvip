import { ValidationError, type CollectionConfig } from 'payload'

import { admins, adminsField, adminsOrSelf, isStaff, ROLES } from '../access'
import { passwordProblem } from '../auth/password-policy'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
    group: 'Settings',
  },
  auth: {
    // Five wrong passwords lock the account for 15 minutes.
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    // Sessions last a working day.
    tokenExpiration: 8 * 60 * 60,
    cookies: { sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' },
  },
  access: {
    // Only admins and editors may use the admin panel.
    admin: ({ req }) => isStaff(req.user),
    create: admins,
    read: adminsOrSelf,
    update: adminsOrSelf,
    delete: admins,
  },
  hooks: {
    beforeValidate: [
      ({ data, originalDoc }) => {
        const password = data?.password
        if (typeof password === 'string' && password.length > 0) {
          const problem = passwordProblem(password, data?.email ?? originalDoc?.email)
          if (problem) {
            throw new ValidationError({
              collection: 'users',
              errors: [{ path: 'password', message: problem }],
            })
          }
        }
        return data
      },
    ],
    beforeChange: [
      // The very first account (created on /admin/create-first-user) is the admin.
      async ({ data, operation, req }) => {
        if (operation !== 'create') return data
        const { totalDocs } = await req.payload.count({ collection: 'users', req })
        if (totalDocs === 0) return { ...data, role: 'admin' }
        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: ROLES.map((value) => ({ value, label: value === 'admin' ? 'Admin' : 'Editor' })),
      // Kept in the session token so access checks need no extra query.
      saveToJWT: true,
      access: { create: adminsField, update: adminsField },
      admin: {
        position: 'sidebar',
        description: 'Admins also manage users and settings. Editors manage content.',
      },
    },
  ],
}
