import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';


@Component({
  imports: [
    RouterOutlet
  ],
  selector: 'app-profile',
  styleUrl: './profile.component.css',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {

  router = inject(Router);

  toCharacters() {
    this.router.navigate(['/characters']);
  }

}
