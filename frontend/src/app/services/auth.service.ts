import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of, shareReplay, BehaviorSubject } from 'rxjs';
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

  constructor(private http: HttpClient) {
    let token = localStorage.getItem("id_token")

    if (!!token) {
      this.dataService.getUsername().subscribe(val => {
        this.userName$.next(val)
      })
      this.isLoggedIn$.next(true)
    }

  }

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
    if (!!authResult.token) {
      console.log("AUTH RESULT: ", authResult)
      localStorage.setItem('id_token', authResult.token);
      this.isLoggedIn$.next(true);
      this.userName$.next(authResult.username);
    }
  }          


  logout(body: any): Observable<boolean> {
    localStorage.removeItem("id_token");
    this.isLoggedIn$.next(false);
    return of(true)
  }
}
