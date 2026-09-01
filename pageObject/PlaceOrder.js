const { expect } = require('@playwright/test')

class PlaceOrder {
    constructor(page) {
        this.page = page;
        this.countryText = page.locator("[placeholder*='Country']");
        this.dropdownList = page.locator(".ta-results");
        this.hidden = page.locator(".ta-backdrop");
        this.validate = page.locator('.user__name label');
        this.creditCardNumber = page.locator("[value='4542 9931 9292 2293']");
        this.expMonth = page.locator(".input.ddl");
        this.expDate = page.locator(".input.ddl");
        this.buy = page.locator("[class*='btnn']");
        this.thankyou = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrders = page.locator("button[routerlink*='myorders']");
    }
    async placingOrder(searchCountry, userName, cardNumber, expiryMonth, expiryDate) {
        await this.countryText.pressSequentially('ind', { delay: 150 });
        await this.dropdownList.locator("button").first().waitFor();
        const options = await this.dropdownList.locator("button");
        const count = await options.count();
        for (let i = 0; i < count; ++i) {
            const teext = await options.nth(i).textContent();
            if (teext === searchCountry) {
                await options.nth(i).click();
                break;
            }
        }
       // await this.hidden.waitFor({ state: "hidden" });
        await expect(this.validate).toHaveText(userName);
        await this.creditCardNumber.fill(cardNumber);
        await this.expMonth.first().selectOption(expiryMonth);
        await this.expDate.last().selectOption(expiryDate);
        await this.buy.click({ force: true });
    }
    async validatingOrderConfirmation(thankyouText) {
        await expect(this.thankyou).toHaveText(thankyouText);
        return await this.orderId.textContent();
    }
    async clickOnMyOrders() {
        await this.myOrders.click();
    }
}

module.exports = { PlaceOrder };