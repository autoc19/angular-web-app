import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { APP_CONFIG, type AppConfig } from '@core/config/app-config';
import { authInterceptor } from '@core/auth/auth.interceptor';
import { errorInterceptor } from '@core/services/error.interceptor';
import { GlobalErrorHandler } from '@core/services/error.handler';

const defaultAppConfig: AppConfig = {
  apiUrl: 'https://api.example.com',
  appName: 'Angular Web App',
  version: '1.0.0',
};

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_CONFIG, useValue: defaultAppConfig },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
};
