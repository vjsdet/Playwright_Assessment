import { Page, Locator } from "@playwright/test";

export default abstract class Base {
  protected page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  protected abstract selectors: {};

  async goTo(url: string) {
    await this.page.goto(url);
  }

  protected async type(element: Locator, text: string) {
    await element.click();
    await element.fill(text);
  }

  async waitForPageReload() {
    await this.page.waitForTimeout(3000);
  }
}
