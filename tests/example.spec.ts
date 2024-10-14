import { test, expect } from '@playwright/test';

test('Should complete Challenge 1', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/')
  const realUrl = page.url();
  const expectedUrl = 'https://todomvc.com/examples/react/dist/'
  expect(realUrl).toBe(expectedUrl);
  const currentDate = new Date().toLocaleDateString();
  await page.locator("#todo-input").fill(currentDate);
  await page.pause();
  console.log(currentDate);
}
)
