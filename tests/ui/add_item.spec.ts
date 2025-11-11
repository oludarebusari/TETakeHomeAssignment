import { test, expect } from "@playwright/test";
import { createLoginPage } from "../../page-objects/loginPage";
import { createDashboardPage } from "../../page-objects/dashboardPage";
import { validCredentials } from "../../fixtures/loginData";
import { cartItems } from "../../fixtures/cartItems";

test.describe("Add Item Tests", () => {
  let loginPage: ReturnType<typeof createLoginPage>;
  let dashboardPage: ReturnType<typeof createDashboardPage>;

  test.beforeEach(async ({ page }) => {
    // Initialize page objects and perform login setup
    loginPage = createLoginPage(page);
    await loginPage.goto();
    await loginPage.login(validCredentials.username, validCredentials.password);
    dashboardPage = createDashboardPage(page);
  });

  test("should not display cart badge when cart is empty", async () => {
    // Verify that the cart badge is not visible when no items are added
    await expect(dashboardPage.cartBadge).not.toBeVisible();
  });

  test("should add multiple products to cart and validate cart badge count", async () => {
    // Add each item from the fixture to the cart using a loop
    for (const item of cartItems) {
      await dashboardPage.addItemToCart(item);
    }

    // Verify that the cart badge displays the correct count of added items
    const cartCount = await dashboardPage.getCartBadgeCount();
    expect(cartCount).toBe(cartItems.length);
  });
});
