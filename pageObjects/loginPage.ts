import {BasePage} from "./basePage";
import {expect, Locator, Page} from "@playwright/test";
import {step} from "./helpers/allure.helper";

const Login = "test";
const Password = "test";

export class LoginPage extends BasePage {
    readonly page: Page;
    readonly enterButton: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly nextButton: Locator;
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.enterButton = page.locator('button >> text="Далі"');
        this.emailInput = page.locator('[id="identifierId"]');
        this.passwordInput = page.locator('[name="Passwd"]');
        this.nextButton = page.locator('button >> text="Далі"');
    }
    @step('Incorrect Login')
    async incorrectLogin() {
        await this.openPage('https://google.com', /Google/);
        await this.enterButton.click();
        await expect(this.page).not.toHaveURL('https://google.com/');
        await this.setValue(this.emailInput, Login)
        await this.nextButton.click();
        await this.setValue(this.passwordInput, Password.split('').reverse().join(''))
        await this.nextButton.click();
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
        await this.openPage('https://google.com', /Google/);
        await this.enterButton.click();
        await expect(this.page).not.toHaveURL('https://google.com/');
        await this.setValue(this.emailInput, Login)
        await this.nextButton.click();
        await this.setValue(this.passwordInput, Password)
        await this.nextButton.click();
        await expect(this.page).toHaveURL('https://www.google.com/');
    }
}
