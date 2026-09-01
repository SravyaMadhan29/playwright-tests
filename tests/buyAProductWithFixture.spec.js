const { test, expect } = require('@playwright/test');
const { text } = require('node:stream/consumers');
const { PageObjectManager } = require('../pageObject/PageObjectManager');
const {customTest} = require('../utils/customTest');

customTest("Add to cart and buy an item", async ({ browser,testdataForOrder }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const pageObjectManager = new PageObjectManager(page);
    const loginPage = pageObjectManager.getLoginpage();
    await loginPage.loadURL();
    await loginPage.performLogin(testdataForOrder.userName, testdataForOrder.passWord);
    const dashBoard = pageObjectManager.getDashboard();
    await dashBoard.waitForPageLoad();
    await dashBoard.searchForProduct(testdataForOrder.productName);
    await dashBoard.navigateToCart();
    const cartPage = pageObjectManager.getCartPage();
    await cartPage.getProducNameLocator(testdataForOrder.productName);
    await cartPage.validateProductIsDisplayed(testdataForOrder.productName);
    await cartPage.checkOut();
    const placeOrder = pageObjectManager.getPlaceOrder();
    await placeOrder.placingOrder(testdataForOrder.searchCountry, testdataForOrder.userName, testdataForOrder.cardNumber, testdataForOrder.expiryMonth, testdataForOrder.expiryDate);
    await placeOrder.validatingOrderConfirmation(testdataForOrder.thankyouText);
    const OrderConfirmation = placeOrder.validatingOrderConfirmation(testdataForOrder.thankyouText);
    const ordersHistory = pageObjectManager.getOrdersHistory();
    // await ordersHistory.waitforOrders();
    // await ordersHistory.viewTheOrder(OrderConfirmation);
    // await ordersHistory.validatePlacedOrderIdDisplayingInMyOrders(OrderConfirmation);
});

