import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todoPage';

test('Should add, strike and remove items from the list', async ({ page }) => {

  const todo = new TodoPage(page);

  await todo.navigateToPage();

  const today = new Date(); // create an object for today
  const firstInput = 'TODO 1 - ' + todo.convertDate(today); //first input defined in the challenge & convert today to a readable string

  await todo.fillInput(firstInput);
  await todo.pressEnter();
  expect(await todo.itemExistsInTheList(firstInput)).toBe(true); //validate that item exists on the list

  const tomorrow = new Date(); // create an object for tomorrow day
  tomorrow.setDate(today.getDate() + 1) //convert object to actual tomorrow
  const secondInput = 'TODO 2 - ' + todo.convertDate(tomorrow); // second input defined in the challenge & convert tomorrow to a readable string

  await todo.fillInput(secondInput);
  await todo.pressEnter();
  await todo.strikeItem(1); //strike current day (1st on the list)
  await todo.mouseHoverDelete(2); // hover the delete button to make it visible
  await todo.deleteItem(2); // delete the second item on the list
  expect(await todo.itemExistsInTheList(secondInput)).toBe(false); // validate that the deleted item doesn't exist in the list
});
