import { Routes } from '@angular/router';
import { ProfilComponent } from './component/user/profil/profil';
import { LoginComponent } from './component/user/login/login';

export const routes: Routes = [
  { path: 'profil', component: ProfilComponent },
  { path: 'auth/login', component: LoginComponent },
];
