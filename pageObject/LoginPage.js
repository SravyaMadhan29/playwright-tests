class LoginPage {
    constructor(page) {
        this.page = page;
        this.userName = page.locator('#userEmail');
        this.userPassword = page.locator('#userPassword');
        this.loginButton = page.locator('#login');
    }

    async loadURL() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async performLogin(userName, passWord) {
        await this.userName.fill(userName);
        await this.userPassword.fill(passWord);
        await this.loginButton.click();
    }
}

module.exports = { LoginPage }