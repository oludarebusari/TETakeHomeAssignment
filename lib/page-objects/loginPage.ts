import { Locator, Page } from '@playwright/test';
import { LoginPage as ILoginPage } from '../../types';

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Username and password do not match',
  USERNAME_REQUIRED: 'Username is required',
  PASSWORD_REQUIRED: 'Password is required',
} as const;

class LoginPage implements ILoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  /**
   * Initializes a new instance of the LoginPage class.
   *
   * @param {Page} page - The page object to use for locating elements.
   */
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navigate to the login page.
   *
   * @returns {Promise<void>} A promise that resolves when the navigation is complete.
   */
  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Logs in to the application.
   *
   * @param {string} username - The username to log in with.
   * @param {string} password - The password to log in with.
   *
   * @returns {Promise<void>} A promise that resolves when the login is complete.
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Retrieves a locator for the element that displays the error message.
   *
   * @returns {Locator} A locator for the element that displays the error message.
   */
  getErrorMessageLocator(): Locator {
    return this.errorMessage;
  }
}

export const createLoginPage = (page: Page): LoginPage => new LoginPage(page);
