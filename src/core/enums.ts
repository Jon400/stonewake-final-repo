/** Role of an API key or signed-in user. */
export const Role = {
  Viewer: 'viewer',
  Analyst: 'analyst',
  Compliance: 'compliance',
  Admin: 'admin',
} as const
export type Role = (typeof Role)[keyof typeof Role]

/** Exposure status as the API returns it in the portfolio list and summary. */
export const ExposureStatus = {
  Green: 'green',
  Amber: 'amber',
  Red: 'red',
  Insufficient: 'insufficient',
  NotAssessed: 'not_assessed',
  SoleTrader: 'sole_trader',
} as const
export type ExposureStatus = (typeof ExposureStatus)[keyof typeof ExposureStatus]
