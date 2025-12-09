import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginLogoutService } from '../../../service/login-logout';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class MenuComponent implements OnInit {
  isConnected = signal<boolean>(false);
  constructor(private router: Router, private logService: LoginLogoutService) {
  }
  ngOnInit(): void {
    this.logService.getSubject().subscribe(v => this.isConnected.set(v));
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
