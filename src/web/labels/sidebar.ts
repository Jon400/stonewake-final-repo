/** Names of the module links in the sidebar. */
export const sidebarModules = {
  dealBook: 'Deal Book',
  tenders: 'Tenders',
  countries: 'Countries',
  institutions: 'Institutions',
  network: 'Network',
  monitoring: 'Monitoring',
  portfolio: 'Portfolio',
  screenings: 'Screenings',
  scoring: 'Scoring',
} as const
export type SidebarModule = (typeof sidebarModules)[keyof typeof sidebarModules]

export const sidebarLabels = {
  team: 'Team',
  signOut: 'Sign out',
} as const
