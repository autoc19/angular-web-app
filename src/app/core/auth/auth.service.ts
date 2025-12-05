import { computed, Injectable, signal } from '@angular/core';
import type { LoginCredentials, User } from './auth.types';

/**
 * Signal-based authentication state service.
 * Implementation intentionally minimal for TDD; behavior completed in task 9.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly currentUserSignal = signal<User | null>(null);
  private readonly isLoadingSignal = signal<boolean>(false);
  private readonly tokenSignal = signal<string | null>(null);

  readonly currentUser = computed(() => this.currentUserSignal());
  readonly isLoggedIn = computed(() => !!this.currentUserSignal());
  readonly isLoading = computed(() => this.isLoadingSignal());

  login(credentials: LoginCredentials): Promise<User> {
    this.isLoadingSignal.set(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        this.tokenSignal.set(crypto.randomUUID());
        const user: User = {
          id: crypto.randomUUID(),
          email: credentials.email,
          name: credentials.email.split('@')[0] || 'User',
        };

        this.currentUserSignal.set(user);
        this.isLoadingSignal.set(false);
        resolve(user);
      }, 0);
    });
  }

  logout(): void {
    this.tokenSignal.set(null);
    this.currentUserSignal.set(null);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  setToken(token: string | null): void {
    this.tokenSignal.set(token);
  }
}
