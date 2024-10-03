import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 30000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/e2e-junit-results.xml' }],
  ],
  projects: [
    {
      name: 'chromium',
      use: {
        baseURL: 'https://www.saucedemo.com/',
        ...devices['Desktop Chrome'],
        viewport: { width: 1600, height: 1000 },
        video: 'on'
      }
    },
  ]
});
