import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(pathname = '/') {
    const baseURL = (this.page.context() as any)._options?.baseURL as string | undefined;
    const target = baseURL ? new URL(pathname, baseURL).toString() : pathname;
    await this.page.goto(target, { waitUntil: 'networkidle' });
  }
}
