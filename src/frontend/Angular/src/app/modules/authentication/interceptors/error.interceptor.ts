import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((response: HttpResponse<any>) => {
        if (response instanceof HttpErrorResponse && response.status === 401) {
          this.router.navigate(['']);
        }

        return throwError(response);
      })
    );
  }
}
