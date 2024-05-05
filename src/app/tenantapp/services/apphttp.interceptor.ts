import { HttpInterceptorFn } from '@angular/common/http';

export const apphttpInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('here we go')
  return next(req);
};
