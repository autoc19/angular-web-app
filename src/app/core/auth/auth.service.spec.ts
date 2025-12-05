import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { LoginCredentials } from './auth.types';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    vi.useFakeTimers();
    service = new AuthService();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const credentials: LoginCredentials = {
    email: 'user@example.com',
    password: 'super-secret',
  };

  it('login should update currentUser signal with user data', async () => {
    const loginResult = service.login(credentials);

    expect(service.isLoading()).toBe(true);

    await vi.runAllTimersAsync();
    await Promise.resolve(loginResult);

    const user = service.currentUser();
    expect(user).toBeTruthy();
    expect(user?.email).toBe(credentials.email);
    expect(user?.name).toBeDefined();
    expect(user?.id).toBeDefined();
  });

  it('login should set isLoading to true during operation, false after', async () => {
    const loginResult = service.login(credentials);

    expect(service.isLoading()).toBe(true);

    await vi.runAllTimersAsync();
    await Promise.resolve(loginResult);

    expect(service.isLoading()).toBe(false);
  });

  it('logout should set currentUser to null', async () => {
    const loginResult = service.login(credentials);
    await vi.runAllTimersAsync();
    await Promise.resolve(loginResult);

    service.logout();

    expect(service.currentUser()).toBeNull();
  });

  it('isLoggedIn should return true when currentUser is not null', async () => {
    const loginResult = service.login(credentials);
    await vi.runAllTimersAsync();
    await Promise.resolve(loginResult);

    expect(service.isLoggedIn()).toBe(true);
  });

  it('isLoggedIn should return false when currentUser is null', () => {
    expect(service.isLoggedIn()).toBe(false);
  });
});
