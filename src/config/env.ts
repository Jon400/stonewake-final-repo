import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { ConfigError } from '@core'

const repoRoot = resolve(__dirname, '..', '..')
const envFile = resolve(repoRoot, '.env')

// A missing .env is fine (CI has none). Variables already in the environment win over .env.
if (existsSync(envFile)) {
  process.loadEnvFile(envFile)
}

/** Returns the value of an optional variable, or undefined when unset or empty. */
export function optionalEnv(name: string): string | undefined {
  const value = process.env[name]?.trim()
  return value ? value : undefined
}

/** Returns the value of a required variable, or throws a ConfigError pointing to .env.example. */
export function requireEnv(name: string): string {
  const value = optionalEnv(name)
  if (value === undefined) {
    throw new ConfigError(name, 'is missing: set it in .env or the environment (see .env.example)')
  }
  return value
}
