import { Injectable, inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of, shareReplay, BehaviorSubject, catchError } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataService } from './data.service';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn = toSignal(this.isLoggedIn$)

  homebrewId$ = new BehaviorSubject<number>(-1);
  public homebrewId = toSignal(this.homebrewId$);

  isHomebrewer$ = new BehaviorSubject<boolean>(false);
  public isHomebrewer = toSignal(this.isHomebrewer$);

  userName$ = new BehaviorSubject<string>('');
  public userName = toSignal(this.userName$)

  dataService = inject(DataService);
  http = inject(HttpClient);


  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/api`;



  signup(body: any) {

    return this.http.post<any>(`${this.baseUrl}/signupattempt`, body, { withCredentials: true })
      .pipe(
        tap((val) => {
          this.setSession(val)
        }),
        shareReplay());
  }

  login(body: any) {

    return this.http.post<any>(`${this.baseUrl}/loginattempt`, body, { withCredentials: true })
      .pipe(
        tap((val) => {
          this.setSession(val)
        }),
        shareReplay());
  }

  loadCurrentUser() {
    return this.dataService.getUsername().pipe(
      tap(val => {
        this.setSession(val)
      }),
      catchError(() => {
        return of(null);
      })
    )
  }


  private setSession(authResult: any) {
    this.isLoggedIn$.next(true);
    this.userName$.next(authResult.username);
    this.isHomebrewer$.next(!!authResult.homebrew_row_id);
    this.homebrewId$.next(authResult.homebrew_row_id ?? -1);
  }


  logout(body: any) {


    return this.http.post<any>(`${this.baseUrl}/logout`, body, { withCredentials: true })
      .pipe(
        tap((val) => {
          this.userName$.next(null);
          this.isLoggedIn$.next(false);
          this.isHomebrewer$.next(false);
          this.homebrewId$.next(-1);
        }),
        shareReplay());
  }


  resetPassword(body: any) {
    return this.http.post<any>(`${this.baseUrl}/reset-password`, body)
  }


  setPassword(body: any) {
    return this.http.post<any>(`${this.baseUrl}/api/set-password`, body)
  }


  forgotPassword(email: string) {
    return this.http.post<any>(`${this.baseUrl}/forgot-password`, { email: email })
  }
}
