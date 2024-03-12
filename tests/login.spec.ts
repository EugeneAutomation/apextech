import {test} from '@playwright/test';
import {LoginPage} from "../pageObjects/loginPage";

test.describe("Login on Google.com, reset password @login", () => {
    test('correct login', async ({page, browserName}) => {
        test.fail(browserName === 'chromium', 'On Chromium - failed due to new process');
        const loginPage = new LoginPage(page);
        await loginPage.correctLogin();
    });

    test('incorrect login @login', async ({page, browserName}) => {
        test.fail(browserName === 'chromium', 'On Chromium - failed due to new process');
        const loginPage = new LoginPage(page);
        await loginPage.incorrectLogin();
    });

    test('reset password @login', async ({page, browserName}) => {
        test.fail(browserName === 'chromium', 'On Chromium - failed due to new process');
        const loginPage = new LoginPage(page);
        await loginPage.incorrectLogin();
        await loginPage.resetPassword();
    });
});
