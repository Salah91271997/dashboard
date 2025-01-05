import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private errorService: ErrorService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';

        if (error.error instanceof ErrorEvent) {
          errorMessage = error.error.message;
        } else {
          switch (error.status) {
            case 401:
              this.router.navigate(['/auth/login']);
              errorMessage = 'Unauthorized access';
              break;
            case 403:
              errorMessage = 'Forbidden';
              break;
            case 404:
              errorMessage = 'Resource not found';
              break;
            case 429:
              errorMessage = 'Too many requests. Please try again later';
              break;
            default:
              errorMessage = error.error?.status_message || errorMessage;
          }
        }

        this.errorService.setError(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
