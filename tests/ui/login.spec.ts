import { test, expect } from '@playwright/test';
import { createLoginPage, ERROR_MESSAGES } from '../../page-objects/loginPage';
import { createDashboardPage } from '../../page-objects/dashboardPage';
import { validCredentials, invalidCredentials } from '../../fixtures/loginData';

test.describe('Login Tests', () => {
  let loginPage: ReturnType<typeof createLoginPage>;

  test.beforeEach(async ({ page }) => {
    loginPage = createLoginPage(page);
    await loginPage.goto();
  });

  test('should display correct page title on login page', async ({ page }) => {
    // Verify that the login page has the expected title
    await expect(page).toHaveTitle('Swag Labs');
  });

  test('should successfully log in with valid credentials and display products', async ({
    page,
  }) => {
    // Perform login with valid credentials
    await loginPage.login(validCredentials.username, validCredentials.password);

    // Initialize dashboard page object for post-login assertions
    const dashboardPage = createDashboardPage(page);

    // Verify navigation to inventory page after login
    await dashboardPage.assertOnInventoryPage();

    // Ensure that products are displayed on the inventory page
    const productCount = await dashboardPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('should display error message for invalid credentials', async () => {
    // Attempt login with invalid credentials
    await loginPage.login(
      invalidCredentials.username,
      invalidCredentials.password
    );

    // Verify that the error message is visible and contains the expected text
    await expect(loginPage.getErrorMessageLocator()).toBeVisible();
    await expect(loginPage.getErrorMessageLocator()).toContainText(
      ERROR_MESSAGES.INVALID_CREDENTIALS
    );
  });

  test('should display error message when username is empty', async () => {
    // Attempt login with empty username
    await loginPage.login('', validCredentials.password);

    // Verify that the error message for required username is displayed
    await expect(loginPage.getErrorMessageLocator()).toBeVisible();
    await expect(loginPage.getErrorMessageLocator()).toContainText(
      ERROR_MESSAGES.USERNAME_REQUIRED
    );
  });

  test('should display error message when password is empty', async () => {
    // Attempt login with empty password
    await loginPage.login(validCredentials.username, '');

    // Verify that the error message for required password is displayed
    await expect(loginPage.getErrorMessageLocator()).toBeVisible();
    await expect(loginPage.getErrorMessageLocator()).toContainText(
      ERROR_MESSAGES.PASSWORD_REQUIRED
    );
  });
});
