import { expect, test } from '@playwright/test';

import { LayoutPage } from '../pages/layout.page';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';

test.describe('layout', () => {
  const email = 'layout-user@example.com';
  const password = 'password123';

  const setup = (page: any) => {
    const layoutPage = new LayoutPage(page);
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    const login = async () => {
      await loginPage.gotoLogin();
      await expect(loginPage.signInHeading).toBeVisible({ timeout: 30000 });

      await loginPage.emailInput.fill(email);
      await loginPage.passwordInput.fill(password);
      await loginPage.submitButton.click();

      await expect(page).toHaveURL(/\/home$/);
      await expect(homePage.heroMessage).toBeVisible();
    };

    return { layoutPage, homePage, loginPage, login };
  };

  test('Admin layout shows header with app name', async ({ page }) => {
    const { layoutPage, login } = setup(page);

    await login();

    await expect(layoutPage.headerBrand).toBeVisible();
  });

  test('Admin layout shows sidebar with navigation items', async ({ page }) => {
    const { layoutPage, login } = setup(page);

    await login();

    await expect(layoutPage.sidebar).toBeVisible();
    await expect(layoutPage.navHome).toBeVisible();
    await expect(layoutPage.navLogin).toBeVisible();
  });

  test('Admin layout shows footer with version', async ({ page }) => {
    const { layoutPage, login } = setup(page);

    await login();

    const currentYear = new Date().getFullYear();
    await expect(layoutPage.footer).toBeVisible();
    await expect(layoutPage.footer.getByText('Angular Web App')).toBeVisible();
    await expect(layoutPage.footer.getByText(`© ${currentYear}`)).toBeVisible();
  });

  test('Blank layout shows only content (no header/sidebar/footer)', async ({ page }) => {
    const { layoutPage, loginPage } = setup(page);

    await loginPage.gotoLogin();

    await expect(layoutPage.header).toHaveCount(0);
    await expect(layoutPage.sidebar).toHaveCount(0);
    await expect(layoutPage.footer).toHaveCount(0);
    await expect(loginPage.signInHeading).toBeVisible();
  });
});
