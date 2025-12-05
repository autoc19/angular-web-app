import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly signInHeading: Locator;
  readonly homeLink: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel('Email address');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: 'Sign in' });
    this.signInHeading = page.getByRole('heading', { name: 'Sign in to continue' });
    this.homeLink = page.getByRole('link', { name: 'Return home' });
  }

  async gotoLogin() {
    await this.goto('/auth/login');
  }
}
