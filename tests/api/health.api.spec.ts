import { test, expect } from '@fixtures'

test('api 1 health', async ({ healthClient }) => {
  const { status, body } = await healthClient.check()
  expect(status).toBe(200)
  expect(Object.keys(body).sort()).toEqual(['app', 'environment', 'status', 'version'])
  expect(body.status).toBe('ok')
  expect(body.app).toBe('stonewake')
  expect(typeof body.version).toBe('string')
  expect(typeof body.environment).toBe('string')
})
