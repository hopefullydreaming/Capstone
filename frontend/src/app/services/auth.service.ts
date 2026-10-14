import { Injectable, signal, inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of, shareReplay } from 'rxjs';
import { Class, Subclass, ClassFeature, CharacterListing, CharacterRecord } from "../models/models"

// import { AuthService as auth } from '@auth0/auth0-angular';
// import { environment as env } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = 'http:localhost:3000/attemptlogin';
  // private apiUrlLogout = 'http:localhost:3000/logout';

  public isLoggedIn = computed(() => {
    return !!localStorage.getItem("id_token")
  });

  // public getLoginState(): boolean {
  //   return this.isLoggedIn()
  // }

  // private auth = inject(auth)

  constructor(private http: HttpClient) { }

  signup(body: any) {
    console.log("SIGN UP ATTEMPT")

    return this.http.post<any>('http://localhost:3000/signupattempt', body)
      .pipe(
        tap((val) => {
          this.setSession(val)
        }),
      shareReplay());
  }

  login(body: any) {
    console.log("LOGIN ATTEMPT")

    return this.http.post<any>('http://localhost:3000/loginattempt', body)
      .pipe(
        tap((val) => {
          this.setSession(val)
        }),
      shareReplay());
  }

  private setSession(authResult: any) {
    if(!!authResult.token)
    localStorage.setItem('id_token', authResult.token);
  }          


  logout(body: any): Observable<boolean> {
    localStorage.removeItem("id_token");
    return of(true)
  }
}
