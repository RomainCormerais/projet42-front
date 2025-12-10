import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth';
import { throwError } from 'rxjs';

const AUTH_URL = `${environment.BACKEND_URL}/authenticate`;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  if (req.url == AUTH_URL) {
    return next(req);
  }
  const tokenString: string = localStorage.getItem('token') ?? '';
  if (!tokenString) {
    return next(req);
  }
    
  // Jeton non expiré
  if (!authService.isExpired(tokenString!)) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${tokenString}` },
    });
    return next(cloned);
  }
  // Jeton expiré
  localStorage.removeItem('token');
  return throwError(() => "Token expiré !");
};
