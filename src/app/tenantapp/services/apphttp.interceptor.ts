import { HttpInterceptorFn } from '@angular/common/http';

export const apphttpInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('apphttpInterceptor. here is the place to plant your jwt token')
  return next(req);
};
