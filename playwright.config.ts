import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'always' }]],
  use: {
    trace: 'on-first-retry',
    actionTimeout: 40000,
    navigationTimeout: 40000,
    screenshot: 'only-on-failure',
    headless: true
  },
  expect: {
    timeout: 40000,
  },
  timeout: 40000,
  projects: [
    {
      name: 'chrome',
      use: {
        channel: 'chrome'
      }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }
  ],
});