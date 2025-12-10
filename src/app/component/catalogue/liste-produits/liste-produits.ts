import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Jeu } from '../../../models/jeu';
import { JeuService } from '../../../service/jeu';
import { EditeurService } from '../../../service/editeur';

import { Router } from '@angular/router';
import { FavorisService } from '../../../service/favoris';
import { Utilisateur } from '../../../models/utilisateur';
import { PanierService } from '../../../service/panier';

import { AuthService } from '../../../service/auth';
import { Subscription } from 'rxjs';
import { JeuCardComponent } from '../jeu-card/jeu-card';
import { SearchbarComponent } from '../../../shared/searchbar/searchbar';

@Component({
  selector: 'app-liste-produits',
  imports: [JeuCardComponent, SearchbarComponent],
  templateUrl: './liste-produits.html',
  styleUrl: './liste-produits.css',
})
export class ListeProduitsComponent implements OnInit, OnDestroy {
  listeJeux = signal<Jeu[]>([]);
  error = signal<string | null>(null);
  connectedUser: Utilisateur | null = null;
  jeuSubscription: Subscription | null = null;
  favoriSubscription: Subscription | null = null;
  constructor(
    private jeuService: JeuService,
    private editeurService: EditeurService,
    private ps: PanierService,
    private favorisService: FavorisService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.connectedUser = this.authService.currentUser;
    this.jeuSubscription = this.jeuService.findAll().subscribe({
      next: (res) => {
        this.listeJeux.set(res);
      },
      error: (err) => {
        this.error.set('Problème de récupération des jeux');
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    this.jeuSubscription?.unsubscribe();
    this.favoriSubscription?.unsubscribe();
  }
  ajoutFavori(jeu: Jeu) {
    if (this.connectedUser != null) {
      this.favorisService.save({ jeuDto: jeu, utilisateurDto: this.connectedUser }).subscribe({
        next: () => {
          console.log('ajout ok');
        },
      });
    }
  }
  goToAjouterJeu() {
    this.router.navigateByUrl('/catalogue/ajout');
  }

  goToJeu(jeu: Jeu) {
    this.router.navigate(['/details', jeu.id_jeu]);
  }
}
