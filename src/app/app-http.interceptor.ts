import { HttpErrorResponse, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { switchMap, catchError, throwError } from 'rxjs';
import { AuthService } from '@app/_services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AppSignalStore } from './_store/Signal.Store';

var isRefreshing:boolean;

// export const appHttpInterceptorNew: HttpInterceptorFn = (req, next) => {
//   const authService = inject(AuthService)
//   const appSignalStore = inject(AppSignalStore)
//   console.log('appHttpInterceptor. Got in now. '+req.url)

//   // req = req.clone({
//   //   withCredentials: true,
//   // });
//   // if (!req.url.endsWith('/oauth/token') && !req.url.endsWith('/oauth/logout')){
//   // let h = req.headers.set('Access-Control-Allow-Origin', '*')
//   // // h = h.set('Content-Type', 'application/json')
//   // const authReq = req.clone({
//   //   headers: h,
//   // })
//   // return next(req).pipe(
//   //   catchError((error) => {
//   //     if (
//   //       error instanceof HttpErrorResponse &&
//   //       !req.url.includes('/oauth/token') &&
//   //       error.status === 401
//   //     ) {
//   //       return handle401Error(req, next);
//   //     }

//   //     return throwError(() => error);
//   //   })
//   // )

//   // }else
//     return next(req);
// };

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const appSignalStore = inject(AppSignalStore)
  const cookieService = inject(CookieService)
  // console.log('appHttpInterceptor. Go for url: '+req.url)
  if (req.url.endsWith('/oauth/token') && !req.url.endsWith('/oauth/logout')){
    return next(req).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
  
  // if (!req.url.endsWith('/oauth/token') && !req.url.endsWith('/oauth/logout')){
  //   console.log('apphttpInterceptor. call refresh token here. '+req.url)
  //   // appSignalStore.refreshAuthToken()
  //   // authService.refreshTokenObservable().subscribe((data) => {
  //   //   console.log('refreshtoken is here. service get data:'+JSON.stringify(data, null, 2) )
  //   // });
  // }
  // return next(req);

  // req = req.clone({
  //   withCredentials: true,
  // });
  // return next(req);

  const jwt = cookieService.get('jwt')
  // console.log('appHttpInterceptor. accessToken:  '+jwt)

  if (jwt!=null && jwt!='') {
    req = addAuthorizationHeader(req, jwt);
  }
  // console.log('interceptor. req headers:'+JSON.stringify(req.headers, null, 2) )
  return next(req).pipe(
    catchError((error) => {
      if (
        error instanceof HttpErrorResponse &&
        !req.url.includes('auth/token') &&
        error.status === 401
      ) {
        console.log('apphttpInterceptor. handle401Error.')
        return handle401Error(req, next, authService, appSignalStore, cookieService);
      }

      return throwError(() => error);
    })
  );
};

const addAuthorizationHeader = (request: HttpRequest<any>, accessToken: string) => {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

const handle401Error = (request: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService, appSignalStore: any, cookieService: CookieService ) => {
  console.log('apphttpInterceptor. handle401Error. 1')
  // const appSignalStore = inject(AppSignalStore)
  // const authService = inject(AuthService)

  if (!isRefreshing) {
    isRefreshing = true;
    console.log('apphttpInterceptor. handle401Error. refreshing')
    
    if (appSignalStore.auth.isAuthenticated() ) {
      return authService.refreshTokenObservable().pipe(
        switchMap(() => {
          isRefreshing = false;
          const jwt = cookieService.get('jwt')
          console.log('apphttpInterceptor. handle401Error. refreshed. call req againwith new accessToken:  '+jwt)
          if (jwt!=null && jwt!='') {
            request = addAuthorizationHeader(request, jwt);
          }
          return next(request);
        }),
        catchError((error) => {
          isRefreshing = false;
          console.log('apphttpInterceptor. handle401Error. tried to refresh token. some error happened')

          if (error.status == '403') {
            // this.eventBusService.emit(new EventData('logout', null));
            console.log('apphttpInterceptor. handle401Error. 403 response set to not authenticated')
            appSignalStore.setAuthNotAuthenticated()
          }
          return throwError(() => error);
        })
      );
    }else
      console.log('apphttpInterceptor. handle401Error. is not authenticated. So no refreshing needed')
  }
  isRefreshing = false;
  return next(request);
}