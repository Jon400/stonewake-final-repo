import type { Role } from '@core'

export interface TeamRef {
  id: string
  name: string
}

export interface TeamScope {
  all_teams: boolean
  teams: TeamRef[]
}

export interface ApiKeyInfo {
  id: string
  name: string
  role: Role
  scopes: string[]
  expires_at: string | null
}

export interface MeResponse {
  credential: 'api_key' | 'user'
  role: Role
  team_scope: TeamScope
  /** Null when the caller is a signed-in user rather than an API key. */
  key: ApiKeyInfo | null
}
