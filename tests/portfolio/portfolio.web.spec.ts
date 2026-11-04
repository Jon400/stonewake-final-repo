import { test, expect } from '@fixtures'
import { ExposureStatus } from '@core'
import { headings } from '@web/labels'

test('ui 10 portfolio', async ({ signedIn, portfolioPage, companyPage }) => {
  await expect(signedIn.heading).toBeVisible()
  await portfolioPage.open()
  await expect(portfolioPage.heading).toHaveText(headings.portfolio)
  for (const status of [
    ExposureStatus.Red,
    ExposureStatus.Amber,
    ExposureStatus.Green,
    ExposureStatus.Insufficient,
    ExposureStatus.NotAssessed,
  ]) {
    await expect(portfolioPage.statusTile(status)).toBeVisible()
  }

  const name = await portfolioPage.openFirstCompany()
  await expect(companyPage.heading).toHaveText(name)
})
