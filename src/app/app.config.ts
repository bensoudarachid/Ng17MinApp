import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from '@app/app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apphttpInterceptor } from '@app/tenantapp/services/apphttp.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { TrainingReducer } from './_store/Training/Training.Reducer';
import { TrainingEffects } from './_store/Training/Training.Effects';
import { AuthReducer } from './_store/Auth/Auth.Reducer';
import { AuthEffects } from './_store/Auth/Auth.Effects';
import { CookieService } from 'ngx-cookie-service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    CookieService,
    provideClientHydration(), 
    provideAnimationsAsync(), 
    provideHttpClient(withInterceptors([apphttpInterceptor])), 
    provideStore({'auth':AuthReducer,'training':TrainingReducer}), 
    provideEffects([AuthEffects, TrainingEffects])]
};
