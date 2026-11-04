import { test, expect } from '@fixtures'
import { InvalidLimit } from '@factories'
import { ExposureStatus } from '@core'

test('api 5 portfolio list', async ({ portfolioClient }) => {
  const { status, body } = await portfolioClient.list({ limit: 2 })
  expect(status).toBe(200)
  expect(Array.isArray(body.items)).toBe(true)
  expect(body.items.length).toBeLessThanOrEqual(2)
  expect(body.limit).toBe(2)
  expect(body.offset).toBe(0)
  expect(Number.isInteger(body.total)).toBe(true)
  for (const item of body.items) {
    expect(typeof item.id).toBe('number')
    expect(typeof item.label).toBe('string')
    expect(typeof item.active).toBe('boolean')
    expect(Object.values(ExposureStatus)).toContain(item.status)
    expect(item.completeness).toBeGreaterThanOrEqual(0)
    expect(item.completeness).toBeLessThanOrEqual(1)
  }

  const maxLimit = await portfolioClient.list({ limit: 100 })
  expect(maxLimit.status).toBe(200)
  expect(maxLimit.body.limit).toBe(100)

  const negative = await portfolioClient.list({ limit: InvalidLimit.Negative })
  expect(negative.status).toBe(422)
  const nonNumeric = await portfolioClient.list({ limit: InvalidLimit.NonNumeric })
  expect(nonNumeric.status).toBe(422)

  const tooLarge = await portfolioClient.list({ limit: InvalidLimit.OutOfRange })
  expect(tooLarge.status).toBe(422)
  expect(tooLarge.body).toMatchObject({
    detail: [{ msg: 'Input should be less than or equal to 100' }],
  })
})

test('api 6 portfolio summary', async ({ portfolioClient }) => {
  const { status, body } = await portfolioClient.summary()
  expect(status).toBe(200)
  expect(Object.keys(body.statuses).sort()).toEqual(Object.values(ExposureStatus).sort())
  let sum = 0
  for (const count of Object.values(body.statuses)) {
    expect(Number.isInteger(count)).toBe(true)
    sum += count
  }
  expect(Number.isInteger(body.active_exposures)).toBe(true)
  expect(Number.isInteger(body.reviews_overdue)).toBe(true)
  expect(sum).toBe(body.active_exposures)

  const list = await portfolioClient.list({ limit: 1 })
  expect(list.body.total).toBe(body.active_exposures)
})
