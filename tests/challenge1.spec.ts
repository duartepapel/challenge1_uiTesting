import { test, expect } from '@playwright/test';

test.only('Should complete Challenge 1', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/')
  const realUrl = page.url();
  const expectedUrl = 'https://todomvc.com/examples/react/dist/'
  expect(realUrl).toBe(expectedUrl);
  const today = new Date(); //variavel para o dia de hoje para reutilizar ao longo do teste
  const currentDay = today.toLocaleDateString(); // criar objecto para o dia de hoje e converter data para uma string legivel
  await page.locator("#todo-input").fill('TODO 1 - ' + currentDay); //concatenar strings e preencher input
  await page.locator("#todo-input").press('Enter');
  const toDoisListed = await page.locator("label[data-testid='todo-item-label']").isVisible(); //fazer store do selector do TODO
  expect(toDoisListed).toBe(true); // validar que o selector existe na lista

  const tommorow = new Date();
  tommorow.setDate(today.getDate() + 1); //definir o dia de amanhã

  const tommorowFormated = tommorow.toLocaleDateString();
  await page.locator("#todo-input").fill('TODO 2 - ' + tommorowFormated);
  await page.locator("#todo-input").press('Enter');

  const currentDayToDo = await page.locator("[data-testid='todo-item-toggle']").nth(0);
  await currentDayToDo.click(); // strike no current day TODO

  const isStriked = await page.locator('[class="completed"]').isVisible();
  expect(isStriked).toBe(true);

  // Hover para o botão de delete aparecer
  const todoElement = await page.locator('li').nth(1);
  await todoElement.hover();

  const deleteButton = await page.locator("(//button[@class='destroy'])[2]");
  await deleteButton.click(); // Click delete button

  // Validar que o item foi apagado (botão de delete não existe)
  const isDeleted = await deleteButton.isVisible();
  expect(isDeleted).toBe(false);
});
