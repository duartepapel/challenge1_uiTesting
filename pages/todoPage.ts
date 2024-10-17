import { type Page, type Locator, expect } from '@playwright/test';
import { url } from 'inspector';
import { todo } from 'node:test';

export class TodoPage {
    private readonly inputBox: Locator;
    private readonly todoItems: Locator;
    private readonly toggleButton: Locator;

    constructor(public readonly page: Page) {
        this.inputBox = this.page.getByTestId('text-input');
        this.todoItems = this.page.getByTestId('todo-item-label');
        this.toggleButton = this.page.getByTestId('todo-item-toggle');
    }

    async goto() {
        await this.page.goto('https://todomvc.com/examples/react/dist/');
    }

    async validateURL() {
        const expectedUrl = "https://todomvc.com/examples/react/dist/";
        const actualUrl = this.page.url();

        expect(expectedUrl).toBe(actualUrl);
    }

    async fillInput(input: string) {
        await this.inputBox.fill(input);
    }

    async pressEnterOnInput() {
        await this.inputBox.press('Enter');
    }

    // method allows to verify that the inputted string exist in the list
    async itemExistsInTheList(expectedItem: string) {
        const items = await this.todoItems; //store all locators with the 'listItem' selector value
        const count = await items.count(); // count the locators

        for (let i = 0; i < count; i++) {
            const itemContent = await items.nth(i).textContent();
            if (itemContent?.includes(expectedItem)) {
                return true; //if item exists in the list 
            }
            else return false; //if item doesn't exist in the list 
        }
    }

    // method allows to choose which item on the list to strike and validate that it is striked    
    async strikeItem(text: string) {
        const count = await this.todoItems.count();  // Get the count of all todo items

        for (let i = 0; i < count; i++) {
            const itemContent = await this.todoItems.nth(i).textContent();

            // Check if the current item's text matches the provided string
            if (itemContent?.includes(text)) {
                // Find the corresponding checkbox using the same index
                const toggleCheckbox = this.toggleButton.nth(i);
                await toggleCheckbox.click();  // Click to strike the item

                // Verify if the item is marked as completed by checking if its parent has the "completed" class
                const itemParentOnTheDom = toggleCheckbox.locator('..').locator('..');  // Go up to the parent <li> element
                const isCompleted = await itemParentOnTheDom.getAttribute('class');  // Get the string value of the class attribute

                expect(isCompleted).toContain('completed');  // Validate the item is marked as completed
            }
        }
    }

    async remove(text: string) {
        const todo = this.todoItems.filter({ hasText: text }); // Locate the todo item that contains the inputted text
        const deleteButton = todo.locator('..').getByTestId('todo-item-button'); // Find the closest parent element, then locate the destroy button within that parent
        await todo.hover(); // Hover over the todo item to reveal the destroy button
        await deleteButton.click();
    }

    public convertDate(date: Date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // because months are zero-indexed
        const year = date.getFullYear();

        return `${day}_${month}_${year}`
    }
}