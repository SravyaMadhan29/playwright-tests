Feature: Ecommerce Validation

  Scenario: User logs in and adds product to cart
    Given I login to the ecommerce site with "testt189@gmail.com" and "Playwright@1234"
    When add "ZARA COAT 3" product to the cart
    Then the "ZARA COAT 3" is visible in the cart
    When Enter valid details "India, testt189@gmail.com,988666576,09,12, Thankyou for the order. " and place the order
    Then verify order present in the OrderHistory