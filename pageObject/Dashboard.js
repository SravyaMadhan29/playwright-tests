const { expect } = require('@playwright/test');
class Dashboard {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.titles = page.locator(".card-body b");
        this.cart = page.locator('[routerlink="/dashboard/cart"]');

        this.orderRows = page.locator("tbody tr");
        this.confirmId = page.locator(".col-text");
    }

    async waitForPageLoad() {
        await this.products.first().waitFor();
    }

    async searchForProduct(productName) {
        const titles = await this.titles.locator(".card-body b").allTextContents();
        console.log(titles);
        const total = await this.products.count();
        console.log("the total products count is " + total);
        for (let i = 0; i < total; ++i) {
            const data = await this.products.nth(i).locator("b").textContent();
            if (data === productName) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCart() {
        await this.cart.click();
    }
}

module.exports = { Dashboard };