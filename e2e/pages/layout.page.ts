import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LayoutPage extends BasePage {
  readonly header: Locator;
  readonly sidebar: Locator;
  readonly footer: Locator;
  readonly main: Locator;
  readonly navHome: Locator;
  readonly navLogin: Locator;
  readonly headerBrand: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator('app-header header');
    this.sidebar = page.locator('app-sidebar aside');
    this.footer = page.locator('app-footer footer');
    this.main = page.locator('main');
    this.navHome = this.sidebar.getByRole('link', { name: 'Home' });
    this.navLogin = this.sidebar.getByRole('link', { name: 'Login' });
    this.headerBrand = this.header.getByText('Angular Web App');
  }

  async gotoHome() {
    await this.goto('/home');
  }
}
