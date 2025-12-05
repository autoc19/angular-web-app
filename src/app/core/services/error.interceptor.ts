import { type HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((error) => {
      console.error('HTTP error intercepted', error);
      return throwError(() => error);
    })
  );
