import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginLogoutService } from '../../../service/login-logout';
import { AuthService } from '../../../service/auth';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectTotalQuantite } from '../../../stores/panier.selector';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class MenuComponent {
  quantiteCommandee = signal<number>(0);
  isConnected = false;

  store = inject(Store);

  constructor(
    private router: Router,
    private logService: LoginLogoutService,
    private authService: AuthService
  ) {
    this.authService.isConnected$.subscribe({
      next: (res) => (this.isConnected = res),
    });
  }

  ngOnInit(): void {
    this.store.select(selectTotalQuantite).subscribe((total) => {
      this.quantiteCommandee.set(total);
    });
  }

  login() {
    this.router.navigateByUrl('/auth/login');
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.logout();
    this.logService.isConnected(false);
    this.router.navigateByUrl('/');
  }
}
