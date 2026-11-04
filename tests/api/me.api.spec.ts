import { test, expect } from '@fixtures'
import { buildTokenSchemeKey } from '@factories'
import { ErrorCode, ErrorMessage } from '@core'

test('api 2 me', async ({ meClient, apiKey }) => {
  const { status, body, headers } = await meClient.get()
  expect(status).toBe(200)
  expect(body.credential).toBe('api_key')
  expect(typeof body.role).toBe('string')
  expect(body.role).toMatch(/^[a-z_]+$/)
  expect(typeof body.team_scope.all_teams).toBe('boolean')
  expect(Array.isArray(body.team_scope.teams)).toBe(true)
  if (!body.team_scope.all_teams) {
    expect(body.team_scope.teams.length).toBeGreaterThan(0)
    for (const team of body.team_scope.teams) {
      expect(typeof team.id).toBe('string')
      expect(typeof team.name).toBe('string')
    }
  }
  expect(headers['x-ratelimit-limit']).toMatch(/^\d+$/)
  expect(headers['x-ratelimit-remaining']).toMatch(/^\d+$/)

  // API-01: only the Bearer scheme is accepted, so a valid key sent as Token is refused.
  const tokenScheme = await meClient.get({ auth: buildTokenSchemeKey(apiKey) })
  expect(tokenScheme.status).toBe(401)
  expect(tokenScheme.body).toEqual({
    error: { code: ErrorCode.Unauthenticated, message: ErrorMessage.Unauthenticated },
  })
})
