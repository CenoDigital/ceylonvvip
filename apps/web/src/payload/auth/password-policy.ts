/**
 * Password policy for admin accounts: at least 12 characters, not one of the
 * passwords attackers try first, and not built from the account's own email.
 */
export const MIN_PASSWORD_LENGTH = 12

const COMMON = new Set([
  'password',
  'password1',
  'password123',
  'passw0rd',
  'qwerty',
  'qwertyuiop',
  'letmein',
  'welcome',
  'admin',
  'administrator',
  'iloveyou',
  'abc123',
  'changeme',
  'ceylonvvip',
  'srilanka',
  '123456789012',
  '111111111111',
  '000000000000',
])

export function passwordProblem(password: string, email?: string): string | null {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Use at least ${MIN_PASSWORD_LENGTH} characters.`
  }
  const lower = password.toLowerCase()
  const stripped = lower.replace(/[^a-z0-9]/g, '').replace(/\d+$/, '')
  if (COMMON.has(lower) || COMMON.has(stripped) || /^(.)\1+$/.test(password)) {
    return 'This password is too common. Choose a longer phrase that is not easy to guess.'
  }
  const local = email?.split('@')[0]?.toLowerCase()
  if (local && local.length >= 4 && lower.includes(local)) {
    return 'Do not use your email address in your password.'
  }
  return null
}
