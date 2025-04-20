import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppSignalStore } from '@src/app/_store/Signal.Store';
// import { AuthService } from '@src/app/_services/auth.service';


export const apphttpInterceptorOld: HttpInterceptorFn = (req, next) => {
  const appSignalStore = inject(AppSignalStore)
  console.log('apphttpInterceptor. Get in. '+req.url)
  if (!req.url.endsWith('/oauth2/token') && !req.url.endsWith('/oauth/logout')){
    console.log('apphttpInterceptor. refresh token here. '+req.url)
    appSignalStore.refreshAuthToken()
  }

  return next(req);
};
