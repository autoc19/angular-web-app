import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { GlobalErrorHandler } from './error.handler';

describe('GlobalErrorHandler', () => {
  let handler: GlobalErrorHandler;

  beforeEach(() => {
    handler = new GlobalErrorHandler();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-01T12:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should log error to console with timestamp', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Unexpected failure');

    handler.handleError(error);

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    const [firstArg, secondArg] = consoleSpy.mock.calls[0];

    expect(String(firstArg)).toContain('2025-01-01T12:00:00.000Z');
    expect(secondArg).toBe(error);
  });

  it('should not throw when handling error', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Non-fatal error');

    expect(() => handler.handleError(error)).not.toThrow();
  });
});
