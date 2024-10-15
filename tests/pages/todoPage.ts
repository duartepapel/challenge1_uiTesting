import { Page, expect } from '@playwright/test';

export class todoPage {

    private page: Page;

    //locators

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

    async typeCurrentDate() {
        const today = new Date(); // define varaible for today
        const currentDay = today.toLocaleDateString(); // convert today into a readable string
        await this.page.locator(this.inputBox).fill('TODO 1 - ' + currentDay);
    }

    async typeTomorrowDate() {
        const today = new Date();
        const tommorow = new Date();
        tommorow.setDate(today.getDate() + 1); //define tommorow
        const tommorowFormated = tommorow.toLocaleDateString(); //convert tommorow into a readable string
        await this.page.locator(this.inputBox).fill('TODO 2 - ' + tommorowFormated);
    }

    async pressEnter() {
        await this.page.locator(this.inputBox).press('Enter');
    }

    //method allows to choose which item on the list to click    
    async strikeItem(itemNumber: number) {
        const listedItem = await this.page.locator(this.itemToggle).nth(itemNumber - 1); // cause it starts at index 0
        await listedItem.click(); // strike the item
        const isStriked = await this.page.locator(this.strikedItem).isVisible();
        expect(isStriked).toBe(true);
    }

    async itemExistsInTheList() {
        const itemisListed = await this.page.locator(this.listItem).isVisible(); // store the selector in a variable
        expect(itemisListed).toBe(true); // assert that it exists
    }

    async mouseHoverDelete(itemNumber: number) {
        const todoElement = await this.page.locator(this.listTag).nth(itemNumber - 1);
        await todoElement.hover();
    }

    async deleteItem(itemNumber: number) {
        const deleteButtonLocator = this.deleteButton(itemNumber); // create an object for the ith delete button locator
        const deleteButton = await this.page.locator(deleteButtonLocator)
        await deleteButton.click(); // Click delete button
        // validate that the item is deleted (if the delete button no longer exists)
        const isDeleted = await deleteButton.isVisible();
        expect(isDeleted).toBe(false);
    }
} 