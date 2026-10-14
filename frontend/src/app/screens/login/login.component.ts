import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { form } from '@angular/forms/signals';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  imports: [
    ReactiveFormsModule
  ],
  selector: 'app-login.component',
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  });

  ngOnInit() {
  }

  submit() {
    console.log("LOGIN ATTEMPT")
    const values = this.form.getRawValue();
    const body = {
      email: values.email,
      password: values.password
    }
    console.log("BODY: ", body, values)
    this.authService.login(body).subscribe({
      next: () => {
        console.log("IS LOGGED IN: ", this.authService.isLoggedIn())
        if (this.authService.isLoggedIn()) {
          this.router.navigate(['/dashboard'])
        }
        else {
          console.log("LOGIN ERROR")
        }
      },
      error: (err) => {
        console.log("ERROR LOGGING IN", err)
        this.router.navigate(['/login'])


        
      }
    })

  }

}
