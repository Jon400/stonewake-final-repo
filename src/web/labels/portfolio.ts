import { ExposureStatus } from '@core'

/** Name shown on each portfolio status tile. */
export const portfolioTileLabels = {
  [ExposureStatus.Red]: 'Red',
  [ExposureStatus.Amber]: 'Amber',
  [ExposureStatus.Green]: 'Green',
  [ExposureStatus.Insufficient]: 'No score yet',
  [ExposureStatus.NotAssessed]: 'Not yet assessed',
} as const
