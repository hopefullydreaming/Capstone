import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
  selector: 'app-reset-password.component',
  styleUrl: './reset-password.component.css',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  token = "";

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
  }

  errorMsg = signal<string>("");

  form: FormGroup = this.fb.group({
    newPassword: ["", Validators.required]
  });



  submit() {

    const values = this.form.getRawValue();

    if (this.token !== "") {
      const body = {
        token: this.token,
        newPassword: values.newPassword
      }

      this.authService.resetPassword(body).subscribe({
          next: () => {
            this.router.navigate(['/login'], { state: { hint: "Password reset successful. Please log in" } });
          },
          error: (err) => {
            this.errorMsg.set(err.error);
          }
        });
    }
    else {
      const body = {
        newPassword: values.newPassword
      }

      this.authService.setPassword(body).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMsg.set(err.error);
        }
      });

    }
  }


}
