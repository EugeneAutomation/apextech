# Test Scenarios

## Feature: Email Client Workflow

```
Scenario: Unsuccessful Login
Given I am on the Google login page
When I attempt to login with invalid password
Then I should see an error message "Неправильний пароль. Повторіть спробу або натисніть "Забули пароль?", щоб скинути його."
```

```
Scenario: Password Reset
Given I am logged out
When I initiate a password reset to my recovery email
Then I should see a success message "Password reset email sent"
```

```
Scenario: Successful Login
Given I have reset my password
When I login with new password
Then I should be logged in successfully
```

## Feature: API Endpoint Testing

```
Scenario: Get All Products
Given the API endpoint
When I request all products
Then I should receive a list of products
```
```
Scenario: Highest and Lowest Price Products
Given the API endpoint
When I request products with highest and lowest price
Then I should receive the correct products
```
```
Scenario: Get All Products
Given the API endpoint
When I request all products
Then I should receive a list of products and all products should have correct properties
```


