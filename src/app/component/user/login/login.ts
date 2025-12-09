import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth';
import { LoginLogoutService } from '../../../service/login-logout';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  logService = inject(LoginLogoutService);
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

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('user', JSON.stringify(response.utilisateur));
        localStorage.setItem('token', response.token);
        this.logService.isConnected(true);
        this.router.navigateByUrl('/catalogue');
      },
      error: () => (this.errorMessage = 'Identifiants incorrects'),
    });
  }
}
