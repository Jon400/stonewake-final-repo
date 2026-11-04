import { expect, mergeTests } from '@playwright/test'
import { apiTest } from './api-fixtures'
import { webTest } from './web-fixtures'

export type { ApiFixtures } from './api-fixtures'
export type { WebFixtures } from './web-fixtures'

/** The test function for every spec. Specs import it from here, never from @playwright/test. */
export const test = mergeTests(apiTest, webTest)

export { expect }
