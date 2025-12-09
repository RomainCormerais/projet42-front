import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginLogoutService } from '../../../service/login-logout';
import { AuthService } from '../../../service/auth';
import { Utilisateur } from '../../../models/utilisateur';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class MenuComponent implements OnInit {
  isConnected : boolean = false
  constructor(private router: Router, private logService: LoginLogoutService, private authService : AuthService) {
  }
  ngOnInit(): void {
    if (this.authService.currentUser != null) {
      this.isConnected = true
    }
    
  }
  login() {
    this.router.navigateByUrl('/auth/login');
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.logService.isConnected(false);
    this.router.navigateByUrl('/');
  }
}
