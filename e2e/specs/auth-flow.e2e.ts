import { expect, test } from '@playwright/test';

import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';

test.describe('auth flow', () => {
  const email = 'auth-user@example.com';
  const password = 'password123';

  const setup = (page: any) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    const login = async () => {
      await loginPage.gotoLogin();
      await expect(loginPage.signInHeading).toBeVisible({ timeout: 30_000 });

      await loginPage.emailInput.fill(email);
      await loginPage.passwordInput.fill(password);
      await expect(loginPage.submitButton).toBeEnabled();

      await loginPage.submitButton.click();

      await expect(page).toHaveURL(/\/home$/);
      await expect(homePage.heroMessage).toBeVisible();
    };

    return { loginPage, homePage, login };
  };

  test('User can fill login form', async ({ page }) => {
    const { loginPage } = setup(page);

    await loginPage.gotoLogin();
    await expect(loginPage.signInHeading).toBeVisible({ timeout: 30_000 });

    await loginPage.emailInput.fill(email);
    await loginPage.passwordInput.fill(password);

    await expect(loginPage.emailInput).toHaveValue(email);
    await expect(loginPage.passwordInput).toHaveValue(password);
    await expect(loginPage.submitButton).toBeEnabled();
  });

  test('User can submit login and navigate to home', async ({ page }) => {
    const { login } = setup(page);

    await login();
  });

  test('Home page shows welcome message', async ({ page }) => {
    const { login, homePage } = setup(page);

    await login();

    await expect(homePage.heroMessage).toBeVisible();
  });
});
