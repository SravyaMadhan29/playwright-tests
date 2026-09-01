const { test, expect } = require('playwright/test');

test("to take screenshot", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({ path: 'partialScreenshot.png' });
    await page.locator("#hide-textbox").click();
    await page.screenshot({ path: 'screenshot.png' });
    await expect(page.locator("#displayed-text")).toBeHidden();
}
);

test("visual testing", async ({ page }) => {
    await page.goto("https://flightaware.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});
