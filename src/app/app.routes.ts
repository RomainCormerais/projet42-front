import { Routes } from '@angular/router';

import { ProfilComponent } from './component/user/profil/profil';
import { LoginComponent } from './component/user/login/login';
import { ListeProduitsComponent } from './component/catalogue/liste-produits/liste-produits';
import { DetailComponent } from './component/catalogue/detail/detail';

export const routes: Routes = [
  { path: 'catalogue', component: ListeProduitsComponent },
  { path: 'details/:id', component: DetailComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'profil', component: ProfilComponent },

];
