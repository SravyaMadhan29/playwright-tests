const { test, expect, request } = require('@playwright/test');
const loginPageLoad = { userEmail: "testt189@gmail.com", userPassword: "playwright@1234" }

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/client")
    {
        data: loginPageLoad
    }
    expect(loginResponse.ok()).toBeTruthy();
}
);

test("login to client app", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

}
);