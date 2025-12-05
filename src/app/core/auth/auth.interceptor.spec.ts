import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { AuthService } from './auth.service';
import { authInterceptor } from './auth.interceptor';

type AuthServiceStub = {
  getToken: () => string | null;
  logout: () => void;
};

describe('authInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authService: AuthServiceStub;

  beforeEach(() => {
    authService = {
      getToken: vi.fn().mockReturnValue(null),
      logout: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService as unknown as AuthService },
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should pass through requests when no token', () => {
    let responseBody: unknown;

    http.get('/test').subscribe((res) => {
      responseBody = res;
    });

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toBe(false);

    req.flush({ ok: true });
    expect(responseBody).toEqual({ ok: true });
  });

  it('should attach Authorization header when token exists (placeholder)', () => {
    vi.spyOn(authService, 'getToken').mockReturnValue('fake-token');

    http.get('/secured').subscribe();

    const req = httpMock.expectOne('/secured');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');

    req.flush({ data: true });
  });

  it('should handle 401 response by triggering logout (placeholder)', () => {
    vi.spyOn(authService, 'getToken').mockReturnValue('fake-token');

    let errorResponse: HttpErrorResponse | null = null;

    http.get('/secured').subscribe({
      next: () => {},
      error: (error) => {
        errorResponse = error as HttpErrorResponse;
      },
    });

    const req = httpMock.expectOne('/secured');
    req.flush({ message: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' });

    expect(errorResponse).toBeInstanceOf(HttpErrorResponse);
    expect((errorResponse as HttpErrorResponse | null)?.status).toBe(401);
    expect(authService.logout).toHaveBeenCalledTimes(1);
  });
});
