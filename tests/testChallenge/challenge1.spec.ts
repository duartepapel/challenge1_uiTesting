import { test, expect } from '@playwright/test';
import { todoPage } from '../pages/todoPage';

test.only('Should complete Challenge 1', async ({ page }) => {

  const todo = new todoPage(page);

  await todo.navigateToPage();

  await todo.typeCurrentDate();
  await todo.pressEnter();
  await todo.itemExistsInTheList(); //validate item exists on the list
  await todo.typeTomorrowDate();
  await todo.pressEnter();
  await todo.strikeItem(1); //strike current day (1st on the list)
  await todo.mouseHoverDelete(2); // hover the delete button to make it visible
  await todo.deleteItem(2); // delete the second item on the list
});
