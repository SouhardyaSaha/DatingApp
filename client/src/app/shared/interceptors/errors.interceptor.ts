import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NotificationService } from "../services/notification.service";
import { NavigationExtras, Router } from "@angular/router";
import { AuthService } from "../../pages/auth/services/auth.service";

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService, private router: Router, private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          console.log(error)
          switch (error.status) {
            case 400:
              this.handle400(error);
              break;
            case 401:
              this.notificationService.error(error.statusText)
              this.authService.logout()
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {state: {error: error.error}}
              this.router.navigateByUrl('/error', navigationExtras);
              break;
            default:
              this.notificationService.error('Something unexpected went wrong');
              break;
          }
        }
        return throwError(error);
      })
    )
  }

  private handle400(error: any) {
    if (error.error.errors) {
      let validationErrors = [];
      for (const key in error.error.errors) {
        if (error.error.errors[key]) {
          validationErrors.push(error.error.errors[key])
        }
      }
      validationErrors = validationErrors.flat()
      this.notificationService.error(validationErrors[0])
      throw validationErrors
    } else {
      this.notificationService.error(error.statusText)
    }
  }
}
