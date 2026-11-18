import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
  selector: 'app-forgot-password.component',
  styleUrl: './forgot-password.component.css',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  showForm = signal<boolean>(true);

  form: FormGroup = this.fb.group({
    email: ["", Validators.required]
  });

  submit() {
    const values = this.form.getRawValue();

    this.authService.forgotPassword(values.email).subscribe(() => {
      this.showForm.set(false);
    })

  }

}
