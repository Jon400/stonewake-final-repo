import type { Credentials } from '@core'
import { optionalEnv, requireEnv } from './env'

const DEFAULT_APP_URL = 'https://app.stonewake.ai'
const DEFAULT_API_URL = 'https://api.stonewake.ai'

function urlFromEnv(name: string, fallback: string): string {
  return (optionalEnv(name) ?? fallback).replace(/\/+$/, '')
}

export const config = {
  appUrl: urlFromEnv('STONEWAKE_APP_URL', DEFAULT_APP_URL),
  apiUrl: urlFromEnv('STONEWAKE_API_URL', DEFAULT_API_URL),

  /** Test account login. Throws ConfigError when missing, so API-only runs don't need it. */
  get credentials(): Credentials {
    return {
      email: requireEnv('STONEWAKE_EMAIL'),
      password: requireEnv('STONEWAKE_PASSWORD'),
    }
  },

  /** API key. Throws ConfigError when missing, so UI-only runs don't need it. */
  get apiKey(): string {
    return requireEnv('STONEWAKE_API_KEY')
  },

  timeouts: {
    test: 30_000,
    expect: 5_000,
    navigation: 30_000,
  },
}

export { API_BASE_PATH, APP_ROUTES } from './urls'
