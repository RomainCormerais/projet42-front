import { Component, OnInit, signal } from '@angular/core';
import { Jeu } from '../../../models/jeu';
import { JeuService } from '../../../service/jeu';
import { EditeurService } from '../../../service/editeur';
import { Editeur } from '../../../models/editeur';
import { RouterLink } from "@angular/router";
import { FavorisService } from '../../../service/favoris';
import { Utilisateur } from '../../../models/utilisateur';
import { PanierService } from '../../../service/panier';
import { DetailComponent } from "../detail/detail";
import { LoginLogoutService } from '../../../service/login-logout';
import { AuthService } from '../../../service/auth';
import { JeuCardComponent } from '../jeu-card/jeu-card';

@Component({
  selector: 'app-liste-produits',
  imports: [JeuCardComponent],
  templateUrl: './liste-produits.html',
  styleUrl: './liste-produits.css',
})
export class ListeProduitsComponent implements OnInit {
  listeJeux = signal<Jeu[]>([]);
  error = signal<string | null>(null);
  // connectedUser: Utilisateur | null = null

  constructor(private jeuService: JeuService, private editeurService: EditeurService, private ps: PanierService, private favorisService: FavorisService, private authService: AuthService) {
  }

  ngOnInit(): void {
    // this.connectedUser = this.authService.currentUser
    this.jeuService.findAll().subscribe({
      next: (res) => {
        this.listeJeux.set(res);
      },
      error: (err) => {
        this.error.set('Problème de récupération des jeux');
        console.log(err);
      },
    });
  }

  // ajoutFavori(jeu: Jeu) {
  //   if (this.connectedUser != null) {

  //     this.favorisService.save({ jeuDto: jeu, utilisateurDto: this.connectedUser }).subscribe({
  //       next: () => {
  //         console.log('ajout ok');
  //       }
  //     })
  //   }

  // }

}
