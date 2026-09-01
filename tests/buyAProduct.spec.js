const { test, expect } = require('@playwright/test');
const { text } = require('node:stream/consumers');

test("Add to cart and buy an item", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const userName = "testt189@gmail.com";
    await page.locator('#userEmail').fill(userName);
    await page.locator('#userPassword').fill("Playwright@1234");
    await page.locator('#login').click();
    console.log("Login Successful");
    await page.locator('.card-body b').first().waitFor();
    const products = await page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const total = await products.count();
    console.log("the total products count is " + total);
    const productName = "ZARA COAT 3";
    for (let i = 0; i < total; ++i) {
        const data = await products.nth(i).locator("b").textContent();
        if (data === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            console.log("click successful");
            break;
        }
    }
    await page.locator('[routerlink="/dashboard/cart"]').click();
    await page.locator('div li').first().waitFor();
    const bool = await page.locator("h3:has-text('Zara coat 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.getByText("Buy Now").click();
    await page.locator("[placeholder*='Country']").pressSequentially('ind', { delay: 150 });
    const dropdown = await page.locator(".ta-results");
    await dropdown.locator("button").first().waitFor();
    const options = await dropdown.locator("button");
    const count = await options.count();
    for (let i = 0; i < count; ++i) {
        const teext = await dropdown.locator("button").nth(i).textContent();
        if (teext === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    const validate = await page.locator('.user__name label').textContent();
    expect(validate).toBe(userName);
    await page.locator("[value='4542 9931 9292 2293']").fill("9876 5678 5432 1243");
    await page.locator(".input.ddl").first().selectOption("06");
    await page.locator(".input.ddl").last().selectOption("11");
    //await page.locator("[data-gtm-form-interact-field-id='0']").fill("348");
    //await page.getByText("Name on Card ").fill("sr");
    await page.locator("[class*='btnn']").click();
    expect(await page.locator(".hero-primary").textContent()).toContain("Thankyou");
    expect(await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
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
