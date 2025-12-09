import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginLogoutService } from '../../../service/login-logout';
import { AuthService } from '../../../service/auth';
import { Utilisateur } from '../../../models/utilisateur';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class MenuComponent {

  isConnected = false

  constructor(private router: Router, private logService: LoginLogoutService, private authService : AuthService) {
    this.authService.isConnected$.subscribe(
      {
        next: (res) => this.isConnected = res
      }
    )
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
