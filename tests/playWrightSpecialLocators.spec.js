const { test, expect } = require('@playwright/test');

test("Playwright Special Locators", async ({ browser }) => {
     const context = await browser.newContext();
     const page = await context.newPage();
     await page.goto("https://rahulshettyacademy.com/angularpractice/");
     await page.getByPlaceholder("Password").fill("344678");
     await page.getByLabel("Check me out if you Love IceCreams!").check();
     await page.getByLabel("Employed").check();
     await page.getByLabel("Gender").selectOption("Female");
     await page.getByRole("button", { name: 'Submit' }).click();
     await page.getByText(" The Form has been submitted successfully!. ").isVisible();
     await page.getByRole("Link", { name: 'Shop' }).click();
     await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();
     page.pause();
});