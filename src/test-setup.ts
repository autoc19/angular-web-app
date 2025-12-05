/**
 * Global test setup for Vitest with Angular v21 (zoneless).
 * Resets the Angular testing module between specs to avoid cross-test pollution.
 */
import { beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';

let testEnvInitialized = false;

beforeEach(() => {
  if (!testEnvInitialized) {
    TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
    testEnvInitialized = true;
  }
  TestBed.resetTestingModule();
});
