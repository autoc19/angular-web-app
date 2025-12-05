import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly heroMessage: Locator;
  readonly dashboardLink: Locator;
  readonly quickHomeLink: Locator;
  readonly heroLoginButton: Locator;
  readonly statusCard: Locator;

  constructor(page: Page) {
    super(page);
    this.heroMessage = page.getByText('Your admin skeleton is ready to explore.');
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.quickHomeLink = page.getByRole('link', { name: /^Home$/ });
    this.heroLoginButton = page.getByRole('link', { name: 'Go to Login' });
    this.statusCard = page.getByText('Status').locator('..').locator('..');
  }

  async gotoHome() {
    await this.goto('/home');
  }
}
