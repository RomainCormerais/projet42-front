import { Routes } from '@angular/router';
import { ListeProduitsComponent } from './component/catalogue/liste-produits/liste-produits';
import { DetailComponent } from './component/catalogue/detail/detail';
import { PanierComponent } from './component/panier/panier/panier';

export const routes: Routes = [
  { path: 'catalogue', component: ListeProduitsComponent },
  { path: 'details/:id', component: DetailComponent },
  { path: "panier", component: PanierComponent }
];
