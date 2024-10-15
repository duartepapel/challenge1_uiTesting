import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 1,
  timeout: 30 * 1000,
  retries: 0,
  reporter: 'html',
  expect: {
    timeout: 5000,
  },
  use: {
    browserName: 'chromium',
    headless: true,
  },
});
