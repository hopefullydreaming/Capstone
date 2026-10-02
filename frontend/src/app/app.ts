import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';



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
  
  toDashboard(){
    this.router.navigate(['/dashboard']);
  }

  toProfile(){
    this.router.navigate(['/profile']);
  }
  
}
