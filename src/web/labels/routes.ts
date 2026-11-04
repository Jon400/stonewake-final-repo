/**
 * Routes of the dashboard, relative to the app URL.
 *
 * web/pages may not import @config (see docs/ARCHITECTURE.md), so the routes live here with the
 * other things that describe the dashboard. Page objects pass them to `page.goto`, which
 * resolves them against the `baseURL` of the Playwright config.
 */
export const routes = {
  dealBook: '/',
  login: '/login',
  countries: '/countries',
  institutions: '/entities',
  portfolio: '/portfolio',
  monitoring: '/monitoring',
  screenings: '/screenings',
  dossiers: '/dossiers',
  scoring: '/scoring',
  country: (code: string): string => `/countries/${code}`,
  institution: (id: string | number): string => `/entities/${id}`,
  company: (id: string): string => `/entities/${id}`,
  deal: (id: string): string => `/deals/${id}`,
} as const
