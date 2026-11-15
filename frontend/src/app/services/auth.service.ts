import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of, shareReplay, BehaviorSubject, catchError } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn = toSignal(this.isLoggedIn$)
  
  userName$ = new BehaviorSubject<string>('');
  public userName = toSignal(this.userName$)

  dataService = inject(DataService);
  http = inject(HttpClient);



  signup(body: any) {
    console.log("SIGN UP ATTEMPT")

    return this.http.post<any>('http://localhost:3000/signupattempt', body, { withCredentials: true })
      .pipe(
        tap((val) => {
          this.setSession(val)
        }),
      shareReplay());
  }

  login(body: any) {
    console.log("LOGIN ATTEMPT")

    return this.http.post<any>('http://localhost:3000/loginattempt', body, {withCredentials: true})
      .pipe(
        tap((val) => {
          this.setSession(val)
        }),
      shareReplay());
  }

  loadCurrentUser() {
    return this.dataService.getUsername().pipe(tap(val => {
      this.setSession(val)
    }),
      catchError(() => {
        // this.currentUserSignal.set(null);
        return of(null); // Completes cleanly so Angular finishes booting
      })
    )
  }


  private setSession(authResult: any) {
      console.log("AUTH RESULT: ", authResult)
      this.isLoggedIn$.next(true);
      this.userName$.next(authResult.username);
  }          


  logout(body: any) {


    return this.http.post<any>('http://localhost:3000/logout', body, { withCredentials: true })
      .pipe(
        tap((val) => {
          this.userName$.next(null);
          this.isLoggedIn$.next(false);
        }),
        shareReplay());
  }
}
