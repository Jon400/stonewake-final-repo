/** Browser tab titles. */
export const pageTitles = {
  login: 'Sign in · Stonewake',
  dealBook: 'Deal Book · Stonewake',
  countries: 'Countries · Stonewake',
  institutions: 'Institutions · Stonewake',
  portfolio: 'Portfolio · Stonewake',
  monitoring: 'Monitoring · Stonewake',
  screenings: 'Screenings · Stonewake',
  dossiers: 'EDD Dossiers · Stonewake',
  scoring: 'Scoring · Stonewake',
  notFound: 'Page not found · Stonewake',
  /** Country, institution and company pages reuse the title of their list page. */
  country: 'Countries · Stonewake',
  institution: 'Institutions · Stonewake',
  company: 'Institutions · Stonewake',
  /** A deal page keeps the Deal Book title. */
  deal: 'Deal Book · Stonewake',
} as const

/** Text of the h1 heading of each page. */
export const headings = {
  login: 'Sign in',
  dealBook: 'Deal Book',
  countries: 'Countries',
  institutions: 'Institutions',
  portfolio: 'Portfolio',
  monitoring: 'Monitoring',
  screenings: 'Screenings',
  dossiers: 'EDD Dossiers',
  scoring: 'Scoring',
} as const

/** Text of the h2 section headings. */
export const sections = {
  deal: { briefing: 'Briefing' },
  country: { countryRisk: 'Country risk', dataSources: 'Data sources' },
} as const
