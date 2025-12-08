import { Routes } from '@angular/router';
import { ListeProduitsComponent } from './component/catalogue/liste-produits/liste-produits';
import { DetailComponent } from './component/catalogue/detail/detail';
import { HomeComponent } from './component/accueil/home/home';

export const routes: Routes = [
  { path: 'accueil', component: HomeComponent },
  { path: 'catalogue', component: ListeProduitsComponent },
  { path: 'details/:id', component: DetailComponent },
  { path: '**', redirectTo: '/accueil' },
];
