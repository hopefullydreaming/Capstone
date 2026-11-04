import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


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
  auth = inject(AuthService);

  toCharacters() {
    this.router.navigate(['/characters']);
  }

  changePassword() {
    console.log("PLACEHOLDER FOR CHANGE PASSWORD")
  }

}
