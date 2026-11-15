import { HttpInterceptorFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("CRED INTERCEPTER", req)
  if (req.url.startsWith('https://localhost:3000/api') || req.url.startsWith('http://localhost:3000/api')) {
    const clonedReq = req.clone({
      withCredentials: true
    });
    console.log("req", req, "\n\n\nclone", clonedReq)
    return next(clonedReq);
  }
  return next(req);
};
