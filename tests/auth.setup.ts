import { test as setup } from '@playwright/test';
import { createLoginPage } from '@page-objects/loginPage';
// import path from 'path';
import { createDashboardPage } from '@page-objects/dashboardPage';

let loginPage: ReturnType<typeof createLoginPage>;

setup.describe('Authentication Setup', () => {
  setup.beforeEach(async ({ page }) => {
    loginPage = createLoginPage(page);
    await loginPage.goto();
  });

  setup('authenticate visual_user', async ({ page }) => {
    await loginPage.login('visual_user', 'secret_sauce');

    // Initialize dashboard page object for post-login assertions
    const dashboardPage = createDashboardPage(page);

    // Verify navigation to inventory page after login
    await dashboardPage.assertOnInventoryPage();
    await page.context().storageState({ path: 'states/visual_user.json' });
  });

  setup('authenticate problem_user', async ({ page }) => {
    await loginPage.login('problem_user', 'secret_sauce');

    // Initialize dashboard page object for post-login assertions
    const dashboardPage = createDashboardPage(page);

    // Verify navigation to inventory page after login
    await dashboardPage.assertOnInventoryPage();
    await page.context().storageState({ path: 'states/problem_user.json' });
  });
});
