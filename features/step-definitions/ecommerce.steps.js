const { PageObjectManager } = require("../../pageObject/PageObjectManager");
const {When, Then, Given} = require('@cucumber/cucumber');
const playwright= require('playwright/test');


Given('I login to the ecommerce site with {string} and {string}', { timeout:100 * 1000},async function (username, password) {
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    this.pageObjectManager = new PageObjectManager(page);
    const loginPage = this.pageObjectManager.getLoginpage();
    await loginPage.loadURL();
    await loginPage.performLogin(username, password);
});

When('add {string} product to the cart', async function (productName) {
    const dashBoard = this.pageObjectManager.getDashboard();
    await dashBoard.waitForPageLoad();
    await dashBoard.searchForProduct(productName);
    await dashBoard.navigateToCart();
});

Then('the {string} is visible in the cart', async function (productName) {
   const cartPage = this.pageObjectManager.getCartPage();
    await cartPage.getProducNameLocator(productName);
    await cartPage.validateProductIsDisplayed(productName);
    await cartPage.checkOut();
});

When('Enter valid details {string} and place the order', { timeout: 100 * 1000 }, async function (details) {
    const [searchCountry, userName, cardNumber, expiryMonth, expiryDate,thankyouText] = details.split(',').map(d => d.trim()); 
    const placeOrder = this.pageObjectManager.getPlaceOrder();
    await placeOrder.placingOrder(searchCountry, userName, cardNumber, expiryMonth, expiryDate);
    await placeOrder.validatingOrderConfirmation(thankyouText);
});

Then('verify order present in the OrderHistory', async function () {
    const ordersHistory = this.pageObjectManager.getOrdersHistory();
    await ordersHistory.verifyOrderPresent();
});

