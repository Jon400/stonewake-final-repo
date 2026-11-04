export const REDACTED = '[REDACTED]'

const SENSITIVE_KEYS = new Set([
  'password',
  'authorization',
  'api_key',
  'apikey',
  'x-api-key',
  'token',
  'access_token',
  'refresh_token',
])

const API_KEY_PATTERN = /swk_live_[A-Za-z0-9_-]+/g
const AUTH_HEADER_PATTERN = /\b(Authorization\s*[:=]\s*)(?:(?:Bearer|Token|Basic)\s+)?[^\s,;'"]+/gi
const SCHEME_PATTERN = /\b(Bearer|Token|Basic)\s+[A-Za-z0-9._~+/=-]{8,}/g

function redactString(value: string): string {
  return value
    .replace(AUTH_HEADER_PATTERN, `$1${REDACTED}`)
    .replace(SCHEME_PATTERN, `$1 ${REDACTED}`)
    .replace(API_KEY_PATTERN, REDACTED)
}

function redactValue(value: unknown, seen: WeakSet<object>): unknown {
  if (typeof value === 'string') return redactString(value)
  if (value instanceof Error) {
    return { name: value.name, message: redactString(value.message) }
  }
  if (typeof value !== 'object' || value === null) return value
  if (seen.has(value)) return '[Circular]'
  seen.add(value)
  if (Array.isArray(value)) return value.map((item) => redactValue(item, seen))
  const result: Record<string, unknown> = {}
  for (const [key, entry] of Object.entries(value)) {
    result[key] = SENSITIVE_KEYS.has(key.toLowerCase()) ? REDACTED : redactValue(entry, seen)
  }
  return result
}

/** Returns a copy of `value` with API keys, authorization headers and secret fields masked. */
export function redact(value: unknown): unknown {
  return redactValue(value, new WeakSet<object>())
}
