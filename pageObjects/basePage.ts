import {expect, Locator, Page} from "@playwright/test";
import {step} from "./helpers/allure.helper";

export class BasePage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    @step('Open page')
    async openPage(url, title) {
        // open "google.com"
        await this.page.goto(url);
        // check that "google.com" opened
        await expect(this.page).toHaveTitle(title);
    }
    @step('Set Value')
    async setValue(element: Locator, value: string) {
        await element.waitFor({timeout: 10000});
        await element.click({clickCount: 3});
        await element.press('Backspace');
        await element.fill(value, {timeout: 10000});
    }
}