import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { form } from '@angular/forms/signals';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  imports: [
    ReactiveFormsModule
  ],
  selector: 'app-sign-up.component',
  styleUrl: './sign-up.component.css',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    username: ["", Validators.required],
    email: ["", Validators.required],
    password: ["", Validators.required]
  });

  ngOnInit() {
  }

  submit() {
    const values = this.form.getRawValue();
    const body = {
      username: values.username,
      email: values.email,
      password: values.password
    }
    console.log("BODY: ", body, values)
    this.authService.signup(body).subscribe({
      next: () => {
        console.log("IS LOGGED IN: ", this.authService.isLoggedIn())
        if (this.authService.isLoggedIn()) {
          this.router.navigate(['/dashboard'])
        }
        else {
          console.log("SIGNUP ERROR")
        }
      },
      error: (err) => {
        console.log("ERROR LOGGING IN", err)
          this.router.navigate(['/profile'])
      }
    })

  }


}
