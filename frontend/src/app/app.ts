import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from './services/auth.service';



@Component({
  imports: [
    RouterOutlet
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  router = inject(Router);
  auth = inject(AuthService);

  // loggedIn = this.auth.getLoginState();
  
  toDashboard(){
    this.router.navigate(['/dashboard']);
  }

  toProfile(){
    this.router.navigate(['/profile']);
  }

  signup(){
    this.router.navigate(['/signup']);
  }

  logout() {
    this.auth.logout({}).subscribe(() => {
      this.router.navigate(['/login'])
    })
  }
  
}
