import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';

// import { StorageService } from '../_services/storage.service';

import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '@src/app/_services/auth.service';
import { AppSignalStore } from '@src/app/_store/Signal.Store';
import { patchState } from '@ngrx/signals';

// import { EventBusService } from '../_shared/event-bus.service';
// import { EventData } from '../_shared/event.class';

@Injectable()
export class AppHttpInterceptorOld implements HttpInterceptor {
  private isRefreshing = false;
  appSignalStore = inject(AppSignalStore)
  constructor(
    // private appSignalStore: AppSignalStore,
    // private storageService: StorageService,
    private authService: AuthService,
    // private eventBusService: EventBusService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('AppHttpInterceptorOld. Got in. '+req.url)
    // if (!req.url.endsWith('/oauth/token') && !req.url.endsWith('/oauth/logout')){
    //   console.log('apphttpInterceptor. refresh token here. '+req.url)
    //   appSignalStore.refreshAuthToken()
    // }
  
    // return next(req);

    req = req.clone({
      withCredentials: true,
    });

    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('auth/token') &&
          error.status === 401
        ) {
          return this.handle401Error(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      console.log('apphttpInterceptor. handle401Error. ')
      if (this.appSignalStore.auth.isAuthenticated() ) {
        return this.authService.refreshTokenObservable().pipe(
          switchMap(() => {
            this.isRefreshing = false;
            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;

            if (error.status == '403') {
              // this.eventBusService.emit(new EventData('logout', null));
              this.appSignalStore.setAuthNotAuthenticated()
            }

            return throwError(() => error);
          })
        );
      }
    }

    return next.handle(request);
  }
}