import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { errorInterceptor } from './error.interceptor';

describe('errorInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    vi.restoreAllMocks();
  });

  it('should pass through successful responses', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    let responseBody: unknown;

    http.get('/ok').subscribe((res) => {
      responseBody = res;
    });

    const req = httpMock.expectOne('/ok');
    req.flush({ ok: true });

    expect(responseBody).toEqual({ ok: true });
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it('should log HTTP errors to console', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    http.get('/fail').subscribe({
      next: () => {},
      error: () => {},
    });

    const req = httpMock.expectOne('/fail');
    req.flush({ message: 'fail' }, { status: 500, statusText: 'Server Error' });

    expect(consoleSpy).toHaveBeenCalledTimes(1);

    const callArgs = consoleSpy.mock.calls[0] as unknown[];
    const loggedError = callArgs.find(
      (arg): arg is HttpErrorResponse => arg instanceof HttpErrorResponse
    );

    expect(loggedError).toBeInstanceOf(HttpErrorResponse);
    expect(loggedError?.status).toBe(500);
  });

  it('should rethrow errors after logging', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    let receivedError: HttpErrorResponse | null = null;
    let nextCalled = false;

    http.get('/boom').subscribe({
      next: () => {
        nextCalled = true;
      },
      error: (error) => {
        receivedError = error as HttpErrorResponse;
      },
    });

    const req = httpMock.expectOne('/boom');
    req.flush({ message: 'boom' }, { status: 404, statusText: 'Not Found' });

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(receivedError).toBeInstanceOf(HttpErrorResponse);
    const status = (receivedError as HttpErrorResponse | null)?.status;
    expect(status).toBe(404);
    expect(nextCalled).toBe(false);
  });
});
