import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/auth-login']); // Redirect to login when unauthorized
        }
        return throwError(() => error); 
      })
    );
  }
}

export const errorInterceptorFn: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const interceptor = new ErrorInterceptor(new Router());
  return interceptor.intercept(req, { handle: next });
};