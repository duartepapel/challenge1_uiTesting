import { Page, expect } from '@playwright/test';

export class TodoPage {

    private page: Page;

    //selectors
    private url = "https://todomvc.com/examples/react/dist/";
    private inputBox = "#todo-input";
    private listItem = "label[data-testid='todo-item-label']";
    private itemToggle = "[data-testid='todo-item-toggle']";
    private strikedItem = "[class='completed']";
    private listTag = "li";
    private deleteButton = (itemNumber: number) => `(//button[@class='destroy'])[${itemNumber}]`;

    constructor(page: Page) {
        this.page = page;
    }

    //actions

    async navigateToPage() {
        await this.page.goto(this.url);
        const realUrl = this.page.url(); // Get the actual URL
        expect(realUrl).toBe(this.url); // Assert that the actual URL matches the expected URL
    }

    async fillInput(input: string) {
        await this.page.locator(this.inputBox).fill(input);
    }

    async pressEnter() {
        await this.page.locator(this.inputBox).press('Enter');
    }

    // method allows to choose which item on the list to click    
    async strikeItem(itemNumber: number) {
        const listedItem = await this.page.locator(this.itemToggle).nth(itemNumber - 1); // cause it starts at index 0
        await listedItem.click(); // strike the item
        const isStriked = await this.page.locator(this.strikedItem).isVisible();
        expect(isStriked).toBe(true);
    }

    // method that takes a string as an argument and compares it with the listed items
    async itemExistsInTheList(expectedItem: string) {
        const items = await this.page.locator(this.listItem); //store all locators with the 'listItem' selector value
        const count = await items.count(); // count the locators

        for (let i = 0; i < count; i++) {
            const itemContent = await items.nth(i).textContent();
            if (itemContent?.includes(expectedItem)) {
                return true; //if item exists in the list 
            }
            else return false; //if item doesn't exist in the list 
        }
    }

    async mouseHoverDelete(itemNumber: number) {
        const todoElement = await this.page.locator(this.listTag).nth(itemNumber - 1);
        await todoElement.hover();
    }

    async deleteItem(itemNumber: number) {
        const deleteButtonLocator = this.deleteButton(itemNumber); // create an object for the ith delete button locator
        const deleteButton = await this.page.locator(deleteButtonLocator)
        await deleteButton.click();
    }

    public convertDate(date: Date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // because months are zero-indexed
        const year = date.getFullYear();

        return `${day}_${month}_${year}`
    }
} 