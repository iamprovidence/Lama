import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AddAuthHeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getCurrentUserToken().pipe(
      mergeMap(token => {
        const clonedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });

        // Pass the cloned request instead of the original request to the next handle
        return next.handle(clonedRequest);
      })
    );
  }
}
