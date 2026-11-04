import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { toObservable } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn$.value) {
      this.router.navigate(["/dashboard"]);
    }
    return !this.authService.isLoggedIn$.value;
  }
}