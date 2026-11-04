import { test, expect } from '@fixtures'
import { buildBasicSchemeKey, buildMalformedKey, buildUnknownKey } from '@factories'
import { ErrorCode, ErrorMessage } from '@core'

const unauthenticated = {
  error: { code: ErrorCode.Unauthenticated, message: ErrorMessage.Unauthenticated },
}

test('api 3 no token', async ({
  meClient,
  portfolioClient,
  countriesClient,
  entitiesClient,
  citationsClient,
}) => {
  const responses = [
    await meClient.get({ auth: 'none' }),
    await portfolioClient.list({}, { auth: 'none' }),
    await countriesClient.list({ auth: 'none' }),
    await entitiesClient.list({}, { auth: 'none' }),
    await citationsClient.resolve(undefined, { auth: 'none' }),
  ]
  for (const response of responses) {
    expect(response.status).toBe(401)
    expect(response.body).toEqual(unauthenticated)
  }
})

test('api 4 bad keys', async ({ meClient, portfolioClient }) => {
  for (const auth of [buildUnknownKey(), buildMalformedKey(), buildBasicSchemeKey()]) {
    const response = await meClient.get({ auth })
    expect(response.status).toBe(401)
    expect(response.body).toEqual(unauthenticated)
  }
  const portfolio = await portfolioClient.list({}, { auth: buildUnknownKey() })
  expect(portfolio.status).toBe(401)
})
