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

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideHttpClient(withInterceptors([apphttpInterceptor])), provideStore({'training':TrainingReducer}), provideEffects([TrainingEffects])]
};
