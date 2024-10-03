import { Browser, BrowserContext, chromium, expect, Page, test, } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import Application from "../pages/application";
import data from "../support/data";

let browser: Browser;
let context: BrowserContext;
let page: Page;
let App: Application;

const firstName = "Automation";
const lastName = "Testing";
const zipcode = "987654";
const orderPlacedMessage = "Thank you for your order!";

test.beforeAll(async () => {
  browser = await chromium.launch();
});

test.beforeEach(async () => {
  context = await browser.newContext({recordVideo: {
    dir: "videos/"
  }});
  page = await context.newPage();
  App = new Application(page);
  await page.goto("/");
  await App.loginPage.loginToApplication(data.email, data.password);
});

test.afterEach(async () => {
  await page.close();
  await context.close();
});

test.afterAll(async () => {
  await browser.close();
});

test("Verify accessibility without navigation issues", async () => {
  await App.itemsPage.clickOnSortIcon();
  await App.itemsPage.selectSpecificSortDropdownValues(data.sortValues.nameZtoA);
  await App.itemsPage.verifyActiveSortFilterValue("Name (Z to A)");

  await page.waitForTimeout(1000);
  expect(await page.screenshot()).toMatchSnapshot("screenshots/test1.png");

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).not.toEqual([1]);
});

test("Verify the price order (high-low) displayed on the “All Items” page", async () => {
  await App.itemsPage.clickOnSortIcon();
  await App.itemsPage.selectSpecificSortDropdownValues(data.sortValues.priceHtoL);
  await App.itemsPage.verifyActiveSortFilterValue("Price (high to low)");
  await App.itemsPage.verifyPricesSortedHtoL();

  await page.waitForTimeout(1000);
  expect(await page.screenshot()).toMatchSnapshot("screenshots\\test2.png");

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).not.toEqual([1]);
});

test("Add multiple items to the cart and validate the checkout journey", async () => {
  await App.itemsPage.clickOnAddToCartButton();
  await App.itemsPage.clickOnAddToCartButton();
  await App.itemsPage.clickOnAddToCartButton();
  await App.itemsPage.clickOnCartBadge();
  await App.itemsPage.clickOnCheckoutButton();
  await App.itemsPage.enterOrderDetails(firstName, lastName, zipcode);
  await App.itemsPage.clickOnContinueButton();
  await App.itemsPage.verifyOrderSummaryIsVisible();
  await App.itemsPage.clickOnFinishButton();
  await App.itemsPage.verifyOrderPlacedSuccessfully(orderPlacedMessage);

  await page.waitForTimeout(1000);
  expect(await page.screenshot()).toMatchSnapshot("screenshots\\test3.png");

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).not.toEqual([1]);
});