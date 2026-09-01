const { test, expect } = require('@playwright/test');

test('Test for First Assignment', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  console.log(await page.title());
  const UserName = "testt189@gmail.com";
  //const Title = await page.title();
  //await expect(Title).toContain("Shop");
  expect(await page.title()).toContain("Shop");
  await page.locator('.login-wrapper-footer-text').click();
  await page.locator('#firstName').fill("test");
  await page.locator('#lastName').fill("test");
  await page.locator('#userEmail').fill(UserName);
  await page.locator('#userMobile').fill('9876543210');
  await page.locator('select').selectOption('Engineer');
  await page.locator('[value="Female"]').check();
  await page.locator('#userPassword').fill('Playwright@1234');
  await page.locator('#confirmPassword').fill('Playwright@1234');
  await page.locator('[type="checkbox"]').check();
  await page.locator('#login').click();
  console.log("User Registration Successful");
  await page.locator('[tabindex="0"]').click();
  await page.locator('#userEmail').fill(UserName);
  await page.locator('#userPassword').fill("Playwright@1234");
  await page.locator('#login').click();
  console.log("Login Successful");
  //console.log(await page.locator('.card-body b').first().textContent());
  //to print all the elements, but playwright do not wait for this method so we are using textcontent() before using allTextContents()
  //instead of using that textContent() to make it wait, we can also use the below line, because that will make the netwrok idol, because most of the applications will work based on network calls
  //await page.waitForLoadState('networkidle');
  //below line is for making the first element of the array to wait
  await page.locator('.card-body b').first().waitFor();
  console.log(await page.locator('.card-body b').allTextContents());
  page.pause();
})
