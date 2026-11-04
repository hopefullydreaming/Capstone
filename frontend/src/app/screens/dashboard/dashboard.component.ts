import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [],
  selector: 'app-dashboard.component',
  styleUrl: './dashboard.component.css',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  auth = inject(AuthService);

}

