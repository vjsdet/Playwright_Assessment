import { expect, Locator, Page } from "@playwright/test";
import Base from "./base";

export default class itemsPage extends Base {
    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    selectors = {
        sortIcon: '[data-test="product-sort-container"]',
        activeSortValue: '[data-test="active-option"]',
        priceValues: '[data-test="inventory-item-price"]',
        addToCartButton: "//button[contains(text(),'Add to cart')]",
        cartBadge: '[data-test="shopping-cart-badge"]',
        checkoutButton: '#checkout',
        firstNameField: '#first-name',
        lastNameField: '#last-name',
        zipcodeField: '#postal-code',
        continueButton: '#continue',
        verifySummary: '.summary_info',
        finishButton: '#finish',
        orderCompleteHeader: '[data-test="complete-header"]'
    };

    get sortIcon(): Locator {
        return this.page.locator(this.selectors.sortIcon);
    }

    get activeSortValue(): Locator {
        return this.page.locator(this.selectors.activeSortValue);
    }

    get priceValues(): Locator {
        return this.page.locator(this.selectors.priceValues);
    }

    get addToCartButton(): Locator {
        return this.page.locator(this.selectors.addToCartButton).nth(0);
    }

    get cartBadge(): Locator {
        return this.page.locator(this.selectors.cartBadge);
    }

    get checkoutButton(): Locator {
        return this.page.locator(this.selectors.checkoutButton);
    }

    get firstNameField(): Locator {
        return this.page.locator(this.selectors.firstNameField);
    }

    get lastNameField(): Locator {
        return this.page.locator(this.selectors.lastNameField);
    }

    get zipcodeField(): Locator {
        return this.page.locator(this.selectors.zipcodeField);
    }

    get conitnueButton(): Locator {
        return this.page.locator(this.selectors.continueButton);
    }

    get summaryInfo(): Locator {
        return this.page.locator(this.selectors.verifySummary);
    }

    get finishButton(): Locator {
        return this.page.locator(this.selectors.finishButton);
    }

    get orderCompleteHeader(): Locator {
        return this.page.locator(this.selectors.orderCompleteHeader);
    }

    async clickOnSortIcon(): Promise<void> {
        await this.sortIcon.click();
    }

    async selectSpecificSortDropdownValues(value: string): Promise<void> {
        await this.sortIcon.selectOption(value);
    }

    async verifyActiveSortFilterValue(value: string): Promise<void> {
        await expect(this.activeSortValue).toHaveText(value);
    }

    async verifyPricesSortedHtoL(): Promise<void> {
        await this.priceValues.count().then(async (count) => {
            const prices = Array(count).fill(0);
            for (var i = 0; i < count; i++) {
                const price = await this.priceValues.nth(i).textContent();
                const priceFinal = price?.replace("$", "").trim();
                prices[i] = priceFinal;
            }
            for (var i = 1; i < prices.length; i++) {
                expect(Number(prices[i])).toBeLessThanOrEqual(Number(prices[i - 1]));
            }

        })
    }

    async clickOnAddToCartButton(): Promise<void> {
        await this.addToCartButton.click();
    }

    async clickOnCartBadge(): Promise<void> {
        await this.cartBadge.click();
    }

    async clickOnCheckoutButton(): Promise<void> {
        await this.checkoutButton.click();
    }

    async enterFirstNameValue(firstName: string): Promise<void> {
        await this.firstNameField.click(); await this.firstNameField.fill(firstName);
    }

    async enterLastNameValue(lastName: string): Promise<void> {
        await this.firstNameField.click(); await this.lastNameField.fill(lastName);
    }

    async enterZipcodeValue(zipcode: string): Promise<void> {
        await this.firstNameField.click(); await this.zipcodeField.fill(zipcode);
    }

    async enterOrderDetails(firstName: string, lastName: string, zipcode: string) {
        await this.enterFirstNameValue(firstName);
        await this.enterLastNameValue(lastName);
        await this.enterZipcodeValue(zipcode);
    }

    async clickOnContinueButton(): Promise<void> {
        await this.conitnueButton.click();
    }

    async verifyOrderSummaryIsVisible(): Promise<void> {
        await expect(this.summaryInfo).toBeVisible();
    }

    async clickOnFinishButton(): Promise<void> {
        await this.finishButton.click();
    }

    async verifyOrderPlacedSuccessfully(message: string): Promise<void> {
        expect(this.orderCompleteHeader).toHaveText(message);
    }
}