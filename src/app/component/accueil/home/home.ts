import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../service/auth';
import { RouterLink } from '@angular/router';
import { Jeu } from '../../../models/jeu';
import { JeuService } from '../../../service/jeu';
import { EditeurService } from '../../../service/editeur';
import { PanierService } from '../../../service/panier';
import { FavorisService } from '../../../service/favoris';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  listeJeux = signal<Jeu[]>([]);
  favoris = signal<number[]>([]);
  error: string | null = null;

  authService = inject(AuthService);
  jeuService = inject(JeuService);
  editeurService = inject(EditeurService);
  ps = inject(PanierService);
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

    if (this.isLogged) {
      this.favorisService.getFavorisByUserId(this.user?.id!).subscribe({
        next: (fav) => {
          this.favoris.set(fav.map((f) => f.jeuDto.id_jeu!) || []);
        },
      });
    }
  }

  jeuxParSlide = computed(() => {
    const jeux = this.listeJeux();
    const groupes: Jeu[][] = [];

    for (let i = 0; i < jeux.length; i += 2) {
      groupes.push(jeux.slice(i, i + 2));
    }

    return groupes;
  });

  estFavori(id: number): boolean {
    return this.favoris().includes(id);
  }

  ajoutFavori(jeu: Jeu) {
    if (this.isLogged) {
      if (this.estFavori(jeu.id_jeu!)) {
        this.favorisService.removeFavori(jeu.id_jeu!, this.user?.id!).subscribe(() => {
          this.favoris.set(this.favoris().filter((id) => id !== jeu.id_jeu));
        });
      } else {
        this.favorisService.save({ jeuDto: jeu, utilisateurDto: this.user! }).subscribe({
          next: () => {
            this.favoris.set([...this.favoris(), jeu.id_jeu!]);
          },
        });
      }
    }
  }
}
