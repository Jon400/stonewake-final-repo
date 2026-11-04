import { test, expect } from '@fixtures'
import { NONSENSE_COUNTRIES_SEARCH_TERM, UNKNOWN_COUNTRY_CODE } from '@factories'
import { headings, pageTitles } from '@web/labels'

test('ui 8 countries', async ({ signedIn, countriesPage, countryPage }) => {
  await expect(signedIn.heading).toBeVisible()
  await countriesPage.open()
  await expect(countriesPage.heading).toHaveText(headings.countries)

  await countriesPage.search('Germany')
  await countriesPage.openCountry('Germany')
  await expect(countryPage.heading).toHaveText('Germany')
  await expect.poll(() => countryPage.getTitle()).toBe(pageTitles.country)
  await expect(countryPage.countryRiskHeading).toBeVisible()
  await expect(countryPage.dataSourcesHeading).toBeVisible()

  await countriesPage.open()
  await countriesPage.search(NONSENSE_COUNTRIES_SEARCH_TERM)
  await expect(countriesPage.noMatchesMessage).toBeVisible()
  await expect(countriesPage.countryLinks).toHaveCount(0)

  await countryPage.openByCode(UNKNOWN_COUNTRY_CODE)
  await expect.poll(() => countryPage.getTitle()).toBe(pageTitles.notFound)
})
