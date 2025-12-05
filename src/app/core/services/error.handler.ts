import { ErrorHandler } from '@angular/core';

export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    const timestamp = new Date().toISOString();
    console.error(`[GlobalErrorHandler] ${timestamp}`, error);
  }
}
