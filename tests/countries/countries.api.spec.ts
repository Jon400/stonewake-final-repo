import { test, expect } from '@fixtures'
import { UNKNOWN_COUNTRY_CODE } from '@factories'

test('api 9 countries', async ({ countriesClient }) => {
  const list = await countriesClient.list()
  expect(list.status).toBe(200)
  expect(Array.isArray(list.body.regions)).toBe(true)
  expect(list.body.countries.length).toBeGreaterThanOrEqual(100)
  for (const country of list.body.countries) {
    expect(country.iso3).toMatch(/^[A-Z]{3}$/)
    expect(typeof country.name).toBe('string')
  }
  const germany = list.body.countries.find((country) => country.iso3 === 'DEU')
  expect(germany?.name).toBe('Germany')

  const detail = await countriesClient.get('DEU')
  expect(detail.status).toBe(200)
  expect(detail.body.iso3).toBe('DEU')
  expect(detail.body.iso2).toBe('DE')
  expect(detail.body.name).toBe('Germany')
  expect(detail.body.region).toBe('europe')
  expect(detail.body.risk?.score).toBeGreaterThanOrEqual(0)
  expect(detail.body.risk?.score).toBeLessThanOrEqual(100)

  const unknown = await countriesClient.get(UNKNOWN_COUNTRY_CODE)
  expect(unknown.status).toBe(404)
})
