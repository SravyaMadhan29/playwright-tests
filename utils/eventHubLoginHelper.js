async function register(page) {
    const Email = "testevent4@email.com";
    const password = "Eventhub@1234";
    await page.goto("https://eventhub.rahulshettyacademy.com");
    await page.getByPlaceholder("you@email.com").fill(Email);
    await page.locator("#register-password").fill(password);
    await page.getByPlaceholder("Repeat your password").fill(password);
    await page.locator("#register-btn").click();
}

async function login(page) {
    const Email = "testevent4@email.com";
    const password = "Eventhub@1234";
    await page.goto("https://eventhub.rahulshettyacademy.com");
    await page.getByPlaceholder("you@email.com").fill(Email);
    await page.locator("[name='password']").fill(password);
    await page.locator("#login-btn").click();
}

module.exports = { login, register }; 