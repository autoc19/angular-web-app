import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/specs',
  testMatch: ['**/*.e2e.ts', '**/*.spec.ts', '**/*.test.ts'],
  outputDir: './e2e/test-results',
  reporter: [['list']],
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  use: {
    baseURL: 'http://localhost:4200',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'pnpm start',
    url: 'http://localhost:4200',
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
