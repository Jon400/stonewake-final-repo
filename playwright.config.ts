import { defineConfig, devices } from '@playwright/test'
import { config } from './src/config'

export default defineConfig({
  testDir: './tests',
  outputDir: './artifacts/test-results',
  timeout: config.timeouts.test,
  workers: 2,
  reporter: [['list'], ['html', { open: 'never', outputFolder: './artifacts/playwright-report' }]],
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'api',
      testMatch: '**/*.api.spec.ts',
    },
    {
      name: 'web',
      testMatch: '**/*.web.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: config.appUrl,
        locale: 'en-GB',
      },
    },
  ],
})
