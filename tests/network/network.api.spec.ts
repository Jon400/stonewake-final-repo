import { test, expect } from '@fixtures'
import { INVALID_SEARCH_TERM_TOO_SHORT, InvalidLimit, NONSENSE_API_SEARCH_TERM } from '@factories'

test('api 10 search', async ({ searchClient }) => {
  const { status, body } = await searchClient.search({ q: 'bank', limit: 3 })
  expect(status).toBe(200)
  expect(body.query).toBe('bank')
  expect(body.hits.length).toBeGreaterThanOrEqual(1)
  expect(body.hits.length).toBeLessThanOrEqual(3)
  for (const hit of body.hits) {
    expect(typeof hit.node_id).toBe('number')
    expect(typeof hit.label).toBe('string')
    expect(hit.score).toBeGreaterThanOrEqual(0)
    expect(hit.score).toBeLessThanOrEqual(1)
  }

  const noMatch = await searchClient.search({ q: NONSENSE_API_SEARCH_TERM })
  expect(noMatch.body.hits).toEqual([])

  const noQuery = await searchClient.search()
  expect(noQuery.status).toBe(422)

  const tooShort = await searchClient.search({ q: INVALID_SEARCH_TERM_TOO_SHORT })
  expect(tooShort.status).toBe(422)
  expect(tooShort.body).toMatchObject({
    detail: [{ msg: 'String should have at least 2 characters' }],
  })

  // API-07: the cap is 25.
  const tooLarge = await searchClient.search({ q: 'bank', limit: InvalidLimit.SearchOutOfRange })
  expect(tooLarge.status).toBe(422)
  expect(tooLarge.body).toMatchObject({
    detail: [{ msg: 'Input should be less than or equal to 25' }],
  })
})
