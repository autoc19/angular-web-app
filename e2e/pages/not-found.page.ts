import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class NotFoundPage extends BasePage {
  readonly heading: Locator;
  readonly message: Locator;
  readonly homeLink: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Lost in space.' });
    this.message = page.getByText('The page you are looking for doesn’t exist or was moved.', { exact: false });
    this.homeLink = page.getByRole('link', { name: 'Return home' });
    this.loginLink = page.getByRole('link', { name: 'Go to login' });
  }

  async gotoNotFound() {
    await this.goto('/not-real');
  }
}
