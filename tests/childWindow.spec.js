const { test, expect } = require('@playwright/test');

test('Test for Dropdpwns and Radiobuttons', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagepractise");
    console.log(await page.title());
    await page.locator('#username').fill("rahulshettyacademy");
    await page.locator('input#password').fill("Learning@830$3mK2");
    // const dropdown = page.locator('select.form-control');
    // await dropdown.selectOption("Student");
    await page.locator('select.form-control').selectOption("Consultant");
    await page.locator('.checkmark').last().click();
    await expect(page.locator('.checkmark').last()).toBeChecked();
    await page.locator('#okayBtn').click();
    await page.locator('#terms').check();
    await page.locator('#signInBtn').click();
    console.log("Login Successfull");
    page.pause();
})

test("Child window", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagepractise");
    const documentLink = page.locator("[href*='documents-request']");
    //we use promise method to execute two steps parallely or asynchronously
    const [newPage] = await Promise.all(
        //to wait for opening a child page
        [context.waitForEvent('page'),
        documentLink.click(),
        ])
    const text = await newPage.locator(".im-para.red").textContent();
    console.log(text);
    const ArrayText = text.split('@');
    console.log(ArrayText);
    const domain = ArrayText[1].split(" ");
    const email = domain[0];
    console.log(email);
    await page.locator('#username').fill(email);
    page.pause();
    //we use input value method to get the entered input value while programming 
    console.log(await page.locator('#username').inputValue());
}
)