import { Component, inject } from '@angular/core';
import { AuthService } from '../../../service/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  auth = inject(AuthService);

  get isLogged() {
    return this.auth.currentUser !== null;
  }

  get user() {
    return this.auth.currentUser;
  }
}
