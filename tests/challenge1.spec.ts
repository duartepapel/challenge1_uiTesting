import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todoPage';
import { convertDate } from '../utils/utils';

test('Should add, strike, and remove items from the list', async ({ page }) => {
  const todo = new TodoPage(page);

  // Navigate to the TodoMVC page and validate the URL
  await todo.goto();
  await todo.validateURL();

  // Add the first item to the list
  const today = new Date();
  const firstTodoInput = `TODO 1 - ${convertDate(today)}`;
  await todo.fillInput(firstTodoInput);
  await todo.pressEnterOnInput();
  expect(await todo.itemExistsInTheList(firstTodoInput)).toBe(true, `Expected "${firstTodoInput}" to exist in the list, but it was not found.`);

  // Add the second item to the list
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const secondTodoInput = `TODO 2 - ${convertDate(tomorrow)}`;
  await todo.fillInput(secondTodoInput);
  await todo.pressEnterOnInput();
  expect(await todo.itemExistsInTheList(secondTodoInput)).toBe(true, `Expected "${secondTodoInput}" to exist in the list, but it was not found.`);

  // Strike the first item and verify it is marked as completed
  await todo.strikeItem(firstTodoInput);
  expect(await todo.itemExistsInTheList(firstTodoInput)).toBe(true, `Expected "${firstTodoInput}" to still exist in the list after being struck.`);

  // Remove the second item and verify it no longer exists
  await todo.remove(secondTodoInput);
  expect(await todo.itemExistsInTheList(secondTodoInput)).toBe(false, `Expected "${secondTodoInput}" to be removed from the list, but it still exists.`);
});