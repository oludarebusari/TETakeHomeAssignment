import { Locator, Page, expect } from '@playwright/test';
import { DashboardPage as IDashboardPage } from '../types';

class DashboardPage implements IDashboardPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;



  /**
   * Initializes a new instance of the DashboardPage class.
   * 
   * @param {Page} page - The page object to use for locating elements.
   */
  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

/**
 * Retrieves the number of products on the page.
 *
 * @returns {Promise<number>} A promise that resolves with the number of products on the page.
 */
  async getProductCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  /**
   * Adds an item to the cart.
   *
   * @param {string} itemName - The name of the item to add to the cart.
   * @throws {Error} If itemName is empty or undefined.
   * @returns {Promise<void>} A promise that resolves when the item has been added to the cart.
   */
  async addItemToCart(itemName: string): Promise<void> {
    if (!itemName || itemName.trim() === '') {
      throw new Error('Item name cannot be empty or undefined');
    }
    const item = this.inventoryItems.filter({ hasText: itemName });
    await item.locator('[data-test*="add-to-cart"]').click();
  }

  /**
   * Retrieves the count of items in the cart badge.
   *
   * @returns {Promise<number>} A promise that resolves with the count of items in the cart badge.
   */
  async getCartBadgeCount(): Promise<number> {
    const text = await this.cartBadge.textContent();
    return parseInt(text || '0');
  }

  /**
   * Asserts that the page is on the inventory page.
   *
   * @returns {Promise<void>} A promise that resolves when the assertion is complete.
   */
  async assertOnInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory/);
  }
}

export const createDashboardPage = (page: Page) => new DashboardPage(page);
