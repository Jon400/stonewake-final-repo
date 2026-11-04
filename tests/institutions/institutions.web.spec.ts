import { test, expect } from '@fixtures'
import { headings, pageTitles } from '@web/labels'

test('ui 9 institutions', async ({ signedIn, institutionsPage, institutionPage }) => {
  await expect(signedIn.heading).toBeVisible()
  await institutionsPage.open()
  await expect(institutionsPage.heading).toHaveText(headings.institutions)
  await expect(institutionsPage.kindFilter).toBeVisible()
  await expect(institutionsPage.countryFilter).toBeVisible()

  // The workspace's institutions change, so search for the first one the list shows.
  await institutionsPage.institutionLinks.first().waitFor()
  // The link shows the short name, then the full name, on separate lines.
  const text = await institutionsPage.institutionLinks.first().innerText()
  const name = text.split('\n')[0].trim()
  await institutionsPage.search(name)
  await expect(institutionsPage.institutionLink(name).first()).toBeVisible()

  await institutionsPage.openInstitution(name)
  await expect.poll(() => institutionPage.getTitle()).toBe(pageTitles.institution)
  await expect(institutionPage.heading).toBeVisible()
})
