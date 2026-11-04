import { test, expect } from '@fixtures'
import { NONSENSE_DEALS_SEARCH_TERM } from '@factories'
import { dealBookLabels } from '@web/labels'

test('ui 7 deal book search', async ({ signedIn, dealPage }) => {
  await expect(signedIn.sectorFilter).toBeVisible()
  await expect(signedIn.selectedTab).toHaveText(dealBookLabels.selectedTab)

  const deal = await signedIn.getFirstDeal()
  expect(deal.href).toMatch(/^\/deals\/[\w-]+$/)

  await signedIn.search(NONSENSE_DEALS_SEARCH_TERM)
  await expect(signedIn.noMatchesMessage).toBeVisible()

  await signedIn.clearSearch()
  await signedIn.openDeal(deal)
  await expect(dealPage.briefingHeading).toBeVisible()
})
