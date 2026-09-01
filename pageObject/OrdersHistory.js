const { expect } = require('@playwright/test');

class OrdersHistory {
    constructor(page) {
        this.page = page;
        // this.myOrdersWait = page.locator(".table");
        // this.orderRows = page.locator("tbody tr");
        // this.confirmId = page.locator(".col-text");
        this.ordersTable = page.locator("table").filter({ has: page.locator("th", { hasText: "Order Id" }) });
        this.myOrdersWait = this.ordersTable.locator("tbody");
        this.orderRows = this.ordersTable.locator("tbody tr");
        this.confirmId = page.locator(".col-text");
    }

    async waitforOrders() {
        await this.myOrdersWait.waitFor();
    }

    async viewTheOrder(OrderConfirmation) {
        const rowscount = await this.orderRows.count();
        console.log("rows count is" + rowscount);
        for (let i = 0; i < rowscount; ++i) {
            const rowOrderId = await this.orderRows.nth(i).locator("th").textContent();
            if (OrderConfirmation.includes(rowOrderId)) {
                await this.orderRows.nth(i).locator("button").first().click();
                break;
            }
        }

    }

    async validatePlacedOrderIdDisplayingInMyOrders(OrderConfirmation) {
        const confirmIdText = await this.confirmId.textContent();
        await expect(OrderConfirmation.includes(confirmIdText)).toBeTruthy();
    }
}

module.exports = { OrdersHistory };