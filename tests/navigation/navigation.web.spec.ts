import { test, expect } from '@fixtures'
import { headings, routes, sidebarModules } from '@web/labels'

test('ui 6 sidebar', async ({
  signedIn,
  sidebar,
  countriesPage,
  institutionsPage,
  portfolioPage,
  monitoringPage,
  screeningsPage,
  dossiersPage,
  scoringPage,
}) => {
  await expect(signedIn.heading).toHaveText(headings.dealBook)

  const steps = [
    { module: sidebarModules.countries, path: routes.countries, page: countriesPage },
    { module: sidebarModules.institutions, path: routes.institutions, page: institutionsPage },
    { module: sidebarModules.portfolio, path: routes.portfolio, page: portfolioPage },
    { module: sidebarModules.monitoring, path: routes.monitoring, page: monitoringPage },
    { module: sidebarModules.screenings, path: routes.screenings, page: screeningsPage },
  ]
  for (const step of steps) {
    await sidebar.open(step.module)
    await step.page.waitForPath(step.path)
    await expect(step.page.heading).toHaveText(step.page.expectedHeading)
  }

  // Q-03: the sidebar has no EDD Dossier link for this account, so open the page by its route.
  await dossiersPage.open()
  await dossiersPage.waitForPath(routes.dossiers)
  await expect(dossiersPage.heading).toHaveText(headings.dossiers)

  await sidebar.open(sidebarModules.scoring)
  await scoringPage.waitForPath(routes.scoring)
  await expect(scoringPage.heading).toHaveText(headings.scoring)
})
