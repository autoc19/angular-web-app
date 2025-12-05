import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiUrl: string;
  appName: string;
  version: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
