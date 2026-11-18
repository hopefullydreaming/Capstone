import { HttpInterceptorFn } from '@angular/common/http';

import { environment } from '../../environments/environment';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {  
  const baseUrl = environment.apiUrl;
  if (req.url.startsWith(`${baseUrl}/api`)) {
    const clonedReq = req.clone({
      withCredentials: true
    });
    return next(clonedReq);
  }
  return next(req);
};
