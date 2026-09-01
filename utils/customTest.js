const base = require('@playwright/test');

exports.customTest = base.test.extend(
    {
        testdataForOrder: {
            userName: "testt189@gmail.com",
            passWord: "Playwright@1234",
            productName: "ZARA COAT 3",
            searchCountry: " India",
            cardNumber: "9876 5678 5432 1243",
            expiryMonth: "06",
            expiryDate: "11",
            thankyouText: " Thankyou for the order. "
        }
    }
)