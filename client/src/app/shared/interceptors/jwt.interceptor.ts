import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from "../../pages/auth/services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(
        (user) => {
          if (!user || !user.token) {
            return next.handle(request)
          }
          const token = user.token
          const headers = request.headers
            .set('Authorization', `Bearer ${ token }`);
          const authReq = request.clone({headers});
          return next.handle(authReq);
        }
      )
    )
  }
}
