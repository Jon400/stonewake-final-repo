import { test, expect } from '@fixtures'
import { NON_NUMERIC_ID, UNKNOWN_ENTITY_ID, UNKNOWN_NODE_ID } from '@factories'
import { ErrorCode, ErrorMessage } from '@core'

test('api 7 entities', async ({ entitiesClient }) => {
  const { status, body } = await entitiesClient.list({ limit: 2 })
  expect(status).toBe(200)
  expect(Array.isArray(body.items)).toBe(true)
  expect(body.items.length).toBeGreaterThanOrEqual(1)
  expect(body.limit).toBe(2)
  expect(body.total).toBeGreaterThan(0)
  for (const item of body.items) {
    expect(typeof item.id).toBe('number')
    expect(typeof item.slug).toBe('string')
    expect(typeof item.display_name).toBe('string')
    expect(typeof item.kind).toBe('string')
  }

  const first = body.items[0]
  const detail = await entitiesClient.get(first.id)
  expect(detail.status).toBe(200)
  expect(detail.body).toEqual(first)
})

test('api 8 entity not found', async ({ entitiesClient, nodesClient }) => {
  const unknown = await entitiesClient.get(UNKNOWN_ENTITY_ID)
  expect(unknown.status).toBe(404)
  expect(unknown.body).toEqual({
    error: { code: ErrorCode.NotFound, message: ErrorMessage.NotFound },
  })

  const nonNumeric = await entitiesClient.get(NON_NUMERIC_ID)
  expect(nonNumeric.status).toBe(422)
  expect(nonNumeric.body).toMatchObject({
    error: { code: ErrorCode.ValidationFailed },
    detail: [{ type: 'int_parsing', loc: ['path', 'entity_id'] }],
  })

  const unknownNode = await nodesClient.get(UNKNOWN_NODE_ID)
  expect(unknownNode.status).toBe(404)

  const noToken = await entitiesClient.get(UNKNOWN_ENTITY_ID, { auth: 'none' })
  expect(noToken.status).toBe(401)
})
