import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
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
    console.log('🚀 ~ login en cours ~ ');
    console.log(this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('user', JSON.stringify(response.utilisateur));
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl('/catalogue');
      },
      error: () => (this.errorMessage = 'Identifiants incorrects'),
    });
  }
}
