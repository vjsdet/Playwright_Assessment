import { Locator, Page } from "@playwright/test";
import Base from "./base";

export default class loginPage extends Base {
    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    selectors = {
        usernameField: "#user-name",
        passwordField: "#password",
        loginButton: "#login-button"
    };

    get usernameField(): Locator {
        return this.page.locator(this.selectors.usernameField);
    }

    get passwordField(): Locator {
        return this.page.locator(this.selectors.passwordField);
    }

    get loginButton(): Locator {
        return this.page.locator(this.selectors.loginButton);
    }

    async enterEmail(email: string): Promise<void> {
        await this.usernameField.click();
        await this.usernameField.fill(email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordField.click();
        await this.passwordField.fill(password);
    }

    async clickOnLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async loginToApplication(email: string, password: string): Promise<void> {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickOnLoginButton();
    }
}