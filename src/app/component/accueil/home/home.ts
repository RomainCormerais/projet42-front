import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../service/auth';
import { RouterLink } from '@angular/router';
import { Jeu } from '../../../models/jeu';
import { JeuService } from '../../../service/jeu';
import { FavorisService } from '../../../service/favoris';
import { JeuCardComponent } from '../../catalogue/jeu-card/jeu-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, JeuCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  listeJeux = signal<Jeu[]>([]);
  error: string | null = null;

  authService = inject(AuthService);
  jeuService = inject(JeuService);
  favorisService = inject(FavorisService);

  get isLogged() {
    return this.authService.currentUser !== null;
  }

  get user() {
    return this.authService.currentUser;
  }

  ngOnInit(): void {
    this.jeuService.findAll().subscribe({
      next: (res) => {
        this.listeJeux.set(res);
      },
      error: (err) => {
        this.error = 'Problème de récupération des jeux';
        console.log(err);
      },
    });
  }

  jeuxParSlide = computed(() => {
    const jeux = this.listeJeux();
    const groupes: Jeu[][] = [];

    for (let i = 0; i < jeux.length; i += 2) {
      groupes.push(jeux.slice(i, i + 2));
    }

    return groupes;
  });
}
