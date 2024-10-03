import { Page } from "@playwright/test";
import loginPage from "./loginPage";
import itemsPage from "./itemsPage";

export default class Application {
    protected page: Page;
    loginPage: loginPage
    itemsPage: itemsPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new loginPage(page);
        this.itemsPage = new itemsPage(page);
    }
}
