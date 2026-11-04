import type { Credentials } from '@core'

const WRONG_PASSWORD = 'definitely-wrong-password-123'

/** Returns the same email with a deliberately wrong password. */
export function buildInvalidCredentials(valid: Credentials): Credentials {
  return { email: valid.email, password: WRONG_PASSWORD }
}
