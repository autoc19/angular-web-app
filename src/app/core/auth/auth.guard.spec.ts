import { TestBed } from '@angular/core/testing';
import {
  type ActivatedRouteSnapshot,
  type RouterStateSnapshot,
  type UrlTree,
  Router,
} from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';
import type { User } from './auth.types';

describe('authGuard', () => {
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;
  let router: Router;
  let createUrlTreeMock: ReturnType<typeof vi.fn>;

  const runGuard = () => TestBed.runInInjectionContext(() => authGuard(route, state));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: Router,
          useValue: {
            createUrlTree: vi.fn(),
          },
        },
      ],
    });

    route = { url: [] } as unknown as ActivatedRouteSnapshot;
    state = { url: '/home' } as RouterStateSnapshot;
    router = TestBed.inject(Router);
    createUrlTreeMock = router.createUrlTree as unknown as ReturnType<typeof vi.fn>;
  });

  it('should return true when user is logged in', () => {
    const authService = TestBed.inject(AuthService);
    const user: User = {
      id: 'user-id',
      email: 'user@example.com',
      name: 'User',
    };

    (authService as any).currentUserSignal.set(user);

    expect(runGuard()).toBe(true);
    expect(createUrlTreeMock).not.toHaveBeenCalled();
  });

  it('should redirect to /auth/login when user is not logged in', () => {
    const authService = TestBed.inject(AuthService);
    (authService as any).currentUserSignal.set(null);

    const loginUrlTree = {} as UrlTree;
    createUrlTreeMock.mockReturnValue(loginUrlTree);

    const result = runGuard();

    expect(createUrlTreeMock).toHaveBeenCalledWith(['/auth/login']);
    expect(result).toBe(loginUrlTree);
  });
});
