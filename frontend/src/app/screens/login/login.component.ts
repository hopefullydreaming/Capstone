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
  selector: 'app-login.component',
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMsg = signal<string>("");

  form: FormGroup = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  });


  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }


  submit() {

    const values = this.form.getRawValue();
    const body = {
      email: values.email,
      password: values.password
    }

    this.authService.login(body).subscribe({
      next: () => {
        if (this.authService.isLoggedIn()) {
          this.router.navigate(['/dashboard'])
        }
      },
      error: (err) => {
        this.errorMsg.set(err.error);        
      }
    })

  }

}
