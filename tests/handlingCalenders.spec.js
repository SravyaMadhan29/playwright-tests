const { test, expect } = require('@playwright/test');

test("script to handle calenders", async ({ page, context }) => {
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    const date = "14";
    const month = "07";
    const year = "2027";
    const expectedList = [month, date, year];
    // const [newPage]= await Promise.all([
    //         await context.waitForEvent('page'),
    //         await page.getByRole("link",{name:'Top Deals'}).click()
    //     ]);
    await page.locator(".react-date-picker__calendar-button__icon").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__tile").nth(Number(month) - 1).click();
    await page.locator("//abbr[text()='" + date + "']").click();
    // const inputs = await page.locator(".react-date-picker__inputGroup input");
    // const count =  expectedList.length;
    // for (let i=0; i<count; ++i)
    // {
    //       const value = await inputs.nth(i).inputValue();
    //       expect(value).toEqual(expectedList[i]);
    // }
    // page.pause();
})
