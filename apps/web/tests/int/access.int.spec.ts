import { migrations } from '@/migrations'
import config from '@payload-config'
import { getPayload, type Migration, type Payload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import type { User } from '@ceylonvvip/db'

// Each test acts as a specific user with overrideAccess: false, exactly like a request
// from the admin panel or the REST API would.
let payload: Payload
let admin: User
let editor: User
let otherEditor: User

const suffix = Date.now().toString(36)
const email = (who: string) => `${who}-${suffix}@test.ceylonvvip.local`
const strong = 'Kandy-lake-at-dawn-2026'

const as = (user: User | null) => ({ overrideAccess: false as const, user })

describe('users, roles and access', () => {
  beforeAll(async () => {
    payload = await getPayload({ config })
    await payload.db.migrate({ migrations: migrations as unknown as Migration[] })
    // Start from an empty users table so first-user behaviour is testable.
    await payload.delete({ collection: 'users', where: { id: { exists: true } } })
  })

  afterAll(async () => {
    await payload.delete({ collection: 'users', where: { email: { contains: suffix } } })
  })

  it('makes the first account an admin even if it asks to be an editor', async () => {
    // The create-first-user screen bypasses access rules, as Payload does internally.
    admin = await payload.create({
      collection: 'users',
      data: { email: email('first'), password: strong, role: 'editor' },
    })
    expect(admin.role).toBe('admin')
  })

  it('lets an admin create editors', async () => {
    editor = await payload.create({
      collection: 'users',
      data: { email: email('editor'), password: strong, role: 'editor' },
      ...as(admin),
    })
    otherEditor = await payload.create({
      collection: 'users',
      data: { email: email('editor2'), password: strong, role: 'editor' },
      ...as(admin),
    })
    expect(editor.role).toBe('editor')
  })

  it('does not let editors or visitors create users', async () => {
    await expect(
      payload.create({
        collection: 'users',
        data: { email: email('sneaky'), password: strong, role: 'editor' },
        ...as(editor),
      }),
    ).rejects.toThrow()
    await expect(
      payload.create({
        collection: 'users',
        data: { email: email('anon'), password: strong, role: 'editor' },
        ...as(null),
      }),
    ).rejects.toThrow()
  })

  it('shows editors only their own account, and visitors nothing', async () => {
    const seenByEditor = await payload.find({ collection: 'users', ...as(editor) })
    expect(seenByEditor.docs.map((u) => u.id)).toEqual([editor.id])

    const seenByAdmin = await payload.find({ collection: 'users', ...as(admin) })
    expect(seenByAdmin.totalDocs).toBe(3)

    await expect(payload.find({ collection: 'users', ...as(null) })).rejects.toThrow()
  })

  it('does not let an editor promote themselves or edit someone else', async () => {
    const updated = await payload.update({
      collection: 'users',
      id: editor.id,
      data: { name: 'Nimal', role: 'admin' },
      ...as(editor),
    })
    expect(updated.name).toBe('Nimal')
    expect(updated.role).toBe('editor')

    await expect(
      payload.update({
        collection: 'users',
        id: otherEditor.id,
        data: { name: 'Hacked' },
        ...as(editor),
      }),
    ).rejects.toThrow()
  })

  it('lets an admin change roles and delete users; editors cannot delete', async () => {
    await expect(
      payload.delete({ collection: 'users', id: otherEditor.id, ...as(editor) }),
    ).rejects.toThrow()

    const promoted = await payload.update({
      collection: 'users',
      id: otherEditor.id,
      data: { role: 'admin' },
      ...as(admin),
    })
    expect(promoted.role).toBe('admin')

    await payload.delete({ collection: 'users', id: otherEditor.id, ...as(admin) })
  })

  it('rejects weak passwords', async () => {
    for (const password of [
      'short1!',
      'password1234',
      'aaaaaaaaaaaaaa',
      `${'editor'}-${suffix}-long`,
    ]) {
      await expect(
        payload.update({
          collection: 'users',
          id: editor.id,
          data: { password },
          ...as(editor),
        }),
        password,
      ).rejects.toThrow()
    }
  })

  it('keeps editors and admins in the admin panel, nobody else', async () => {
    const editorAccess = await payload.collections.users.config.access.admin?.({
      req: { user: { ...editor, collection: 'users' } } as never,
    })
    const anonAccess = await payload.collections.users.config.access.admin?.({
      req: { user: null } as never,
    })
    expect(editorAccess).toBe(true)
    expect(anonAccess).toBe(false)
  })

  it('locks an account after five wrong passwords', async () => {
    for (let i = 0; i < 5; i++) {
      await expect(
        payload.login({
          collection: 'users',
          data: { email: email('editor'), password: 'wrong-password-123' },
        }),
      ).rejects.toThrow()
    }
    // Even the right password is refused while locked.
    await expect(
      payload.login({ collection: 'users', data: { email: email('editor'), password: strong } }),
    ).rejects.toThrow(/locked/i)
  })
})
