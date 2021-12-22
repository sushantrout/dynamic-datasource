import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators'
import { AlertifyService } from './alertify.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private alertify : AlertifyService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Error occured on: '+error.message);
        this.alertify.error(error.message);
        return throwError(error.message);
      })
    );
  }
}
