const { test, expect } = require('@playwright/test');

//test for opening a new browser page by using the "page" fixture
//if we use .only then only that particular test will ran and all other tests will get ignored
test('Page Playwright test', async ({ page }) => {
     await page.goto("https://google.com");
     console.log(await page.title());
     await expect(page).toHaveTitle("Google");
     page.pause();
});
//explictly writing code for opening a new browser page
test('test for new browser page', async ({ browser }) => {
     const context = await browser.newContext();
     const page = await context.newPage();
     const Username = page.locator('#username');
     const Password = page.locator('input#password');
     await page.goto("https://rahulshettyacademy.com/loginpagepractise/");
     console.log(await page.title());
     await page.locator('#username').fill("rahulshettyaademy");
     await page.locator('input#password').fill("Learing@830$3mK2");
     await page.locator('#signInBtn').click();
     console.log(await page.locator("[style*='block']").textContent());
     await expect(page.locator("[style*='block']")).toContainText('Incorrect');
     await Username.fill("");
     await Password.fill("");
     await Username.fill("rahulshettyacademy");
     await Password.fill("Learning@830$3mK2");
     await page.locator('#signInBtn').click();
     // to print particular element
     console.log(await page.locator('.card-body a').first().textContent());
     // console.log(await page.locator('.card-body a').nth(1).textContent());
     // to print all the elements, but playwright do not wait for this method so we are using textcontent() before using allTextContents()
     console.log(await page.locator('.card-body a').allTextContents());
     page.pause();
});

