import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { routes } from '@app/app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
// import { apphttpInterceptor } from '@app/tenantapp/services/apphttp.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthReducer } from '@app/_store/Auth/Auth.Reducer';
import { AuthEffects } from '@app/_store/Auth/Auth.Effects';
import { CookieService } from 'ngx-cookie-service';
import { appHttpInterceptor } from '@app/app-http.interceptor';
import { AppHttpInterceptorOld } from './tenantapp/services/apphttp.interceptorOldToo';
// import { AppHttpInterceptor } from './app-http.interceptor';
// import { AppHttpInterceptor } from './tenantapp/services/apphttp.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })), 
    CookieService,
    provideClientHydration(), 
    provideAnimationsAsync(), 
    provideHttpClient(withInterceptors([appHttpInterceptor])), 
    // provideHttpClient(withInterceptors([AppHttpInterceptor.intercept()])), 
    // provideHttpClient(), 
    // { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptorOld, multi: true },
    provideStore({'auth':AuthReducer}), 
    provideEffects([AuthEffects])]
};
