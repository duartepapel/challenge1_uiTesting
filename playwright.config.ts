import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 1,
  timeout: 30 * 1000,
  retries: 1,
  reporter: [
    ["line"],
    ['html'],
    [
      "allure-playwright",
      {
        resultsDir: "allure-results",
      },
    ],
  ],
  expect: {
    timeout: 5000,
  },
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    video: 'on',
    trace: 'on',
  },
});
