import { Locator } from '@playwright/test';

export interface LoginPage {
  goto(): Promise<void>;
  login(username: string, password: string): Promise<void>;
  getErrorMessageLocator(): Locator;
}

export interface DashboardPage {
  getProductCount(): Promise<number>;
  addItemToCart(itemName: string): Promise<void>;
  getCartBadgeCount(): Promise<number>;
  assertOnInventoryPage(): Promise<void>;
}

export interface Credentials {
  username: string;
  password: string;
}

export type CartItems = string[];
