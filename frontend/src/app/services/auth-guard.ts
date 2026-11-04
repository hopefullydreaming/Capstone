import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    if (!this.authService.isLoggedIn$.value) {
      this.router.navigate(["/login"]);
    }
    return this.authService.isLoggedIn$;
  }
}