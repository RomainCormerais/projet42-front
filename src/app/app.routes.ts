import { Routes } from '@angular/router';

import { ProfilComponent } from './component/user/profil/profil';
import { LoginComponent } from './component/user/login/login';
import { ListeProduitsComponent } from './component/catalogue/liste-produits/liste-produits';
import { DetailComponent } from './component/catalogue/detail/detail';
import { HomeComponent } from './component/accueil/home/home';
import { PanierComponent } from './component/panier/panier/panier';
import { RegisterComponent } from './component/user/register/register/register';
import { FavorisComponent } from './component/catalogue/favoris/favoris';
import { AjoutProduitComponent } from './component/catalogue/ajout-produit/ajout-produit';

export const routes: Routes = [
  { path: 'accueil', component: HomeComponent },
  { path: 'catalogue', component: ListeProduitsComponent },
  { path: 'catalogue/ajout', component: AjoutProduitComponent },
  { path: 'catalogue/ajout/:id', component: AjoutProduitComponent },
  { path: 'details', component: DetailComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'favoris', component: FavorisComponent },
  { path: 'profil', component: ProfilComponent },
  { path: '**', redirectTo: '/accueil' },
];
