import { Routes } from '@angular/router';
import { ListeProduitsComponent } from './component/catalogue/liste-produits/liste-produits';
import { DetailComponent } from './component/catalogue/detail/detail';

export const routes: Routes = [
  { path: 'catalogue', component: ListeProduitsComponent },
  { path: 'details/:id', component: DetailComponent },
];
