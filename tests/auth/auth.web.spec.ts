import { test, expect } from '@fixtures'
import { buildInvalidCredentials } from '@factories'
import {
  headings,
  pageTitles,
  routes,
  sidebarLabels,
  sidebarModules,
  termsOfServiceUrl,
} from '@web/labels'

test('ui 1 login ok', async ({ loginPage, dealBookPage, sidebar, credentials }) => {
  await loginPage.open()
  expect(loginPage.currentPath()).toBe(routes.login)
  await expect.poll(() => loginPage.getTitle()).toBe(pageTitles.login)
  await expect(loginPage.heading).toHaveText(headings.login)

  await loginPage.login(credentials)
  await expect.poll(() => dealBookPage.getTitle()).toBe(pageTitles.dealBook)
  await expect(dealBookPage.heading).toHaveText(headings.dealBook)
  await expect(sidebar.teamLabel).toBeVisible()
  await expect(sidebar.root).toContainText(sidebarLabels.team)
  await expect(sidebar.moduleLink(sidebarModules.dealBook)).toBeVisible()
  await expect(sidebar.moduleLink(sidebarModules.portfolio)).toBeVisible()
  await expect(sidebar.moduleLink(sidebarModules.countries)).toBeVisible()
  await expect(sidebar.signOutButton).toBeVisible()
})

test('ui 2 wrong password', async ({ loginPage, sidebar, credentials }) => {
  await loginPage.open()
  await loginPage.attemptLogin(buildInvalidCredentials(credentials))
  await expect(loginPage.errorMessage).toBeVisible()
  expect(loginPage.currentPath()).toBe(routes.login)
  await expect(loginPage.heading).toHaveText(headings.login)
  await expect(sidebar.root).toHaveCount(0)
})

test('ui 3 terms checkbox', async ({ loginPage, credentials }) => {
  await loginPage.open()
  await expect(loginPage.submitButton).toBeDisabled()
  await loginPage.fillCredentials(credentials)
  await expect(loginPage.submitButton).toBeDisabled()
  await loginPage.acceptTerms()
  await expect(loginPage.submitButton).toBeEnabled()
  await loginPage.declineTerms()
  await expect(loginPage.submitButton).toBeDisabled()
  await expect(loginPage.termsLink).toHaveAttribute('href', termsOfServiceUrl)
})

test('ui 4 not logged in redirect', async ({
  loginPage,
  dealBookPage,
  portfolioPage,
  countryPage,
  institutionsPage,
  sidebar,
}) => {
  for (const page of [dealBookPage, portfolioPage, institutionsPage]) {
    await page.open()
    await loginPage.waitForPath(routes.login)
    await expect(loginPage.heading).toHaveText(headings.login)
  }
  await countryPage.openByCode('DEU')
  await loginPage.waitForPath(routes.login)
  await expect(loginPage.heading).toHaveText(headings.login)
  await expect(sidebar.root).toHaveCount(0)
})

test('ui 5 logout', async ({ signedIn, sidebar, loginPage, portfolioPage }) => {
  await expect(signedIn.heading).toHaveText(headings.dealBook)
  await sidebar.signOut()
  await loginPage.waitForPath(routes.login)
  await expect(loginPage.heading).toHaveText(headings.login)

  await portfolioPage.open()
  await loginPage.waitForPath(routes.login)
  await expect(loginPage.heading).toHaveText(headings.login)
})
