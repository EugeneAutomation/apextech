import {BasePage} from "./basePage";
import {expect, Page} from "@playwright/test";
import {step} from "./helpers/allure.helper";

const Login = "evgeniy.kizimenko@gmail.com";
const Password = "Ke22021992";

export class LoginPage extends BasePage {
    readonly page: Page;
    constructor(page: Page) {
        super(page);
        this.page = page;
    }
    @step('Incorrect Login')
    async incorrectLogin() {
        await this.openGoogle();
        await this.page.click('[aria-label="Увійти"]');
        await expect(this.page).not.toHaveURL('https://google.com/');
        await this.setValue(this.page.locator('[id="identifierId"]'), Login)
        await this.page.click('button >> text="Далі"');
        await this.setValue(this.page.locator('[name="Passwd"]'), Password.split('').reverse().join(''))
        await this.page.click('button >> text="Далі"');
        await expect(this.page.locator('[aria-live="polite"] span')).toHaveText(`Неправильний пароль. Повторіть спробу або натисніть "Забули пароль?", щоб скинути його.`);
    }
    @step('Reset password')
    async resetPassword() {
        await this.page.click('button >> text="Забули пароль?"');
        await this.page.waitForSelector('span >> text="Відновлення облікового запису"');
        await this.page.waitForSelector('span >> text="Щоб захистити ваш обліковий запис, ми хочемо переконатися, що входите справді ви"');
    }
    @step('Correct Login')
    async correctLogin() {
        await this.openGoogle();
        await this.page.click('[aria-label="Увійти"]');
        await expect(this.page).not.toHaveURL('https://google.com/');
        await this.setValue(this.page.locator('[id="identifierId"]'), Login)
        await this.page.click('button >> text="Далі"');
        await this.setValue(this.page.locator('[name="Passwd"]'), Password)
        await this.page.click('button >> text="Далі"');
        await expect(this.page).toHaveURL('https://www.google.com/');
    }
}
