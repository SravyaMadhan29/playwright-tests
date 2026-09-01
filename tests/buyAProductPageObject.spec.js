const { test, expect } = require('@playwright/test');
const { text } = require('node:stream/consumers');
const { PageObjectManager } = require('../pageObject/PageObjectManager');
const { stringify } = require('node:querystring');
const dataset = JSON.parse(JSON.stringify(require('../utils/buyAProduct.json')));

for (const data of dataset)
{
test(`Add to cart and buy an item ${data.productName}`, async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const pageObjectManager = new PageObjectManager(page);
    const loginPage = pageObjectManager.getLoginpage();
    await loginPage.loadURL();
    await loginPage.performLogin(data.userName, data.passWord);
    const dashBoard = pageObjectManager.getDashboard();
    await dashBoard.waitForPageLoad();
    await dashBoard.searchForProduct(data.productName);
    await dashBoard.navigateToCart();
    const cartPage = pageObjectManager.getCartPage();
    await cartPage.getProducNameLocator(data.productName);
    await cartPage.validateProductIsDisplayed(data.productName);
    await cartPage.checkOut();
    const placeOrder = pageObjectManager.getPlaceOrder();
    await placeOrder.placingOrder(data.searchCountry, data.userName, data.cardNumber, data.expiryMonth, data.expiryDate);
    await placeOrder.validatingOrderConfirmation(data.thankyouText);
    const OrderConfirmation = placeOrder.validatingOrderConfirmation(data.thankyouText);
    const ordersHistory = pageObjectManager.getOrdersHistory();
    // await ordersHistory.waitforOrders();
    // await ordersHistory.viewTheOrder(OrderConfirmation);
    // await ordersHistory.validatePlacedOrderIdDisplayingInMyOrders(OrderConfirmation);
});
}
