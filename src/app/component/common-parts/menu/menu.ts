import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class MenuComponent {
  isConnected = signal<boolean>(false);
  // constructor(private router: Router, private logService: LoginLogoutService) {
  //   logService.getSubject().subscribe(v => this.isConnected.set(v));
  // }
  // login() {
  //   this.router.navigateByUrl('/auth');
  // }
  // logout() {
  //   localStorage.removeItem('tokens');
  //   localStorage.removeItem('user');
  //   this.logService.isConnected(false);
  //   this.router.navigateByUrl('/');
  // }
}
