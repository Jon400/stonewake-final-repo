import { test as base } from '@playwright/test'
import type { Credentials } from '@core'
import { config } from '@config'
import { Sidebar } from '@web/components'
import {
  CompanyPage,
  CountriesPage,
  CountryPage,
  DealBookPage,
  DealPage,
  DossiersPage,
  InstitutionPage,
  InstitutionsPage,
  LoginPage,
  MonitoringPage,
  PortfolioPage,
  ScoringPage,
  ScreeningsPage,
} from '@web/pages'

export interface WebFixtures {
  /** Valid login from config. Read only when requested. */
  credentials: Credentials
  loginPage: LoginPage
  dealBookPage: DealBookPage
  dealPage: DealPage
  countriesPage: CountriesPage
  countryPage: CountryPage
  institutionsPage: InstitutionsPage
  institutionPage: InstitutionPage
  portfolioPage: PortfolioPage
  companyPage: CompanyPage
  monitoringPage: MonitoringPage
  screeningsPage: ScreeningsPage
  dossiersPage: DossiersPage
  scoringPage: ScoringPage
  sidebar: Sidebar
  /** Signs in with the valid credentials and gives the Deal Book the login lands on. */
  signedIn: DealBookPage
}

// Each test gets a fresh browser context, so a session is never shared between tests.
// Page fixtures only wrap the page. A test that needs a session depends on `signedIn`.
// Undo teardown for tests that change workspace data would go after `use` in their fixtures.
export const webTest = base.extend<WebFixtures>({
  // eslint-disable-next-line no-empty-pattern
  credentials: async ({}, use) => {
    await use(config.credentials)
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  dealBookPage: async ({ page }, use) => {
    await use(new DealBookPage(page))
  },
  dealPage: async ({ page }, use) => {
    await use(new DealPage(page))
  },
  countriesPage: async ({ page }, use) => {
    await use(new CountriesPage(page))
  },
  countryPage: async ({ page }, use) => {
    await use(new CountryPage(page))
  },
  institutionsPage: async ({ page }, use) => {
    await use(new InstitutionsPage(page))
  },
  institutionPage: async ({ page }, use) => {
    await use(new InstitutionPage(page))
  },
  portfolioPage: async ({ page }, use) => {
    await use(new PortfolioPage(page))
  },
  companyPage: async ({ page }, use) => {
    await use(new CompanyPage(page))
  },
  monitoringPage: async ({ page }, use) => {
    await use(new MonitoringPage(page))
  },
  screeningsPage: async ({ page }, use) => {
    await use(new ScreeningsPage(page))
  },
  dossiersPage: async ({ page }, use) => {
    await use(new DossiersPage(page))
  },
  scoringPage: async ({ page }, use) => {
    await use(new ScoringPage(page))
  },
  sidebar: async ({ page }, use) => {
    await use(new Sidebar(page))
  },
  signedIn: async ({ page, loginPage, credentials }, use) => {
    await loginPage.open()
    await loginPage.login(credentials)
    await use(new DealBookPage(page))
  },
})
