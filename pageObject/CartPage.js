const { expect } = require('@playwright/test');

class CartPage {

    constructor(page) {
        this.page = page;
        this.titles = page.locator(".card-body b");
        this.cartLoad = page.locator('div li');
        this.buyNow = page.getByText("Buy Now");
    }

    async getProducNameLocator(productName) {
        return this.page.locator(`h3:has-text('${productName}')`);
    }

    async validateProductIsDisplayed(productName) {
        await this.cartLoad.first().waitFor();
        const locator = await this.getProducNameLocator(productName);
        const bool = await locator.isVisible();
        expect(bool).toBeTruthy();
    }

    async checkOut() {
        await this.buyNow.first().click();
    }
}

module.exports = { CartPage };