import { expect, test } from '@playwright/test';

import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { NotFoundPage } from '../pages/not-found.page';

test.describe('navigation', () => {
  const email = 'nav-user@example.com';
  const password = 'password123';

  const setup = (page: any) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const notFoundPage = new NotFoundPage(page);

    const login = async () => {
      await loginPage.gotoLogin();
      await expect(loginPage.signInHeading).toBeVisible({ timeout: 30000 });

      await loginPage.emailInput.fill(email);
      await loginPage.passwordInput.fill(password);
      await loginPage.submitButton.click();

      await expect(page).toHaveURL(/\/home$/);
      await expect(homePage.heroMessage).toBeVisible();
    };

    return { homePage, loginPage, notFoundPage, login, page };
  };

  test('User can navigate from home to login', async ({ page }) => {
    const { homePage, loginPage, login } = setup(page);

    await login();
    await homePage.heroLoginButton.click();

    await expect(loginPage.signInHeading).toBeVisible();
  });

  test('User can navigate back to home', async ({ page }) => {
    const { homePage, loginPage, login } = setup(page);

    await login();
    await homePage.heroLoginButton.click();
    await expect(loginPage.signInHeading).toBeVisible();

    await loginPage.homeLink.click();

    await expect(homePage.heroMessage).toBeVisible();
  });

  test('Unknown route shows 404 page', async ({ page }) => {
    const { notFoundPage } = setup(page);

    await notFoundPage.gotoNotFound();

    await expect(notFoundPage.heading).toBeVisible();
    await expect(notFoundPage.message).toBeVisible();
  });

  test('404 page has link back to home', async ({ page }) => {
    const { notFoundPage, loginPage, login } = setup(page);

    await login();
    await notFoundPage.gotoNotFound();
    await expect(notFoundPage.heading).toBeVisible();

    await notFoundPage.homeLink.click();

    await expect(loginPage.signInHeading).toBeVisible();
  });
});
