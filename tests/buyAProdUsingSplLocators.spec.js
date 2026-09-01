const { test, expect } = require('@playwright/test');
const { text } = require('node:stream/consumers');

test("Add to cart and buy an item", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const userName = "testt189@gmail.com";
    await page.getByPlaceholder("email@example.com").fill(userName);
    await page.getByPlaceholder("enter your passsword").fill("P");
    await page.getByRole("button", { name: 'Login' }).click();
    await page.locator('.card-body b').first().waitFor();
    await page.locator(".card-body").filter({ hasText: "ZARA COAT 3" }).getByRole("button", { name: ' Add To Cart' }).click();
    await page.getByRole("listitem").getByRole("button").filter({ hasText: "Cart" }).click();
    await page.locator('div li').first().waitFor();
    await page.getByText("ZARA COAT 3").isVisible();
    await page.getByRole("button", { name: 'Checkout' }).click();
    await page.getByPlaceholder("Select Country").pressSequentially('ind', { delay: 150 });
    await page.getByRole("button", { name: 'India' }).nth(1).click();
    const validate = await page.locator('.user__name label').textContent();
    expect(validate).toBe(userName);
    await page.locator("[value='4542 9931 9292 2293']").fill("9876 5678 5432 1243");
    await page.locator(".input.ddl").first().selectOption("06");
    await page.locator(".input.ddl").last().selectOption("11");
    await page.getByText("Place Order ").click();
    expect(await page.getByText(" Thankyou for the order. ").isVisible());
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const order = orderId.trim(" ");
    console.log(order);
    await page.getByRole("button", { name: 'Orders' }).click();
    await page.locator("tbody tr").first().waitFor();
    // const id = await page.locator("tbody tr").filter({hasText:orderId});
    // await id.getByRole("button",{name:'View'}).click();
    const rows = await page.locator("tbody tr");
    const rowscount = await rows.count();
    console.log(rowscount);
    for (let i = 0; i < rowscount; ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const confirmId = await page.locator(".col-text").textContent();
    expect(orderId.includes(confirmId)).toBeTruthy();
    console.log(confirmId);
})
