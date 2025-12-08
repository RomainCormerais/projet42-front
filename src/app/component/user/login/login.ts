import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class LoginComponent {
  fb = inject(FormBuilder);
  // authService = inject(AuthService);
  router = inject(Router);

  loginForm!: FormGroup;
  errorMessage = '';

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submitLogin() {
    if (this.loginForm.invalid) return;

    // this.authService.login(this.loginForm.value).subscribe({
    //   next: () => this.router.navigate(['/']),
    //   error: (err) => {
    //     this.errorMessage = err.error?.message || 'Email ou mot de passe incorrect.';
    //   },
    // });
  }
}
