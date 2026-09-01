const { LoginPage } = require('../pageObject/LoginPage');
const { Dashboard } = require('../pageObject/Dashboard');
const { CartPage } = require('../pageObject/CartPage');
const { PlaceOrder } = require('../pageObject/PlaceOrder');
const { OrdersHistory } = require('../pageObject/OrdersHistory');

class PageObjectManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboard = new Dashboard(page);
        this.cartPage = new CartPage(page);
        this.placeOrder = new PlaceOrder(page);
        this.ordersHistory = new OrdersHistory(page);

    }

    getLoginpage() {
        return this.loginPage;
    }

    getDashboard() {
        return this.dashboard;
    }

    getCartPage() {
        return this.cartPage;
    }

    getPlaceOrder() {
        return this.placeOrder;
    }

    getOrdersHistory() {
        return this.ordersHistory;
    }
}

module.exports = { PageObjectManager };