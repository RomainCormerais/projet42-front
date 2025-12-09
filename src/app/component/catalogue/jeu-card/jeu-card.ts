import { Component, computed, inject, input, signal } from '@angular/core';
import { Jeu } from '../../../models/jeu';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth';
import { FavorisService } from '../../../service/favoris';
import { Store } from '@ngrx/store';
import { addProduit, removeProduit } from '../../../stores/panier.action';

@Component({
  selector: 'app-jeu-card',
  imports: [RouterLink],
  templateUrl: './jeu-card.html',
  styleUrl: './jeu-card.css',
})
export class JeuCardComponent {
  jeu = input.required<Jeu>();
  favoris = signal<number[]>([]);
  quantiteCommandee: number = 0;

  favorisService = inject(FavorisService);
  authService = inject(AuthService);
  router = inject(Router);
  store = inject(Store);

  get isLogged() {
    return this.authService.currentUser !== null;
  }

  get user() {
    return this.authService.currentUser;
  }

  ngOnInit(): void {
    if (this.isLogged) {
      this.favorisService.getFavorisByUserId(this.user?.id!).subscribe({
        next: (fav) => {
          this.favoris.set(fav.map((f) => f.jeuDto.id_jeu!));
        },
      });
    }
    this.store.select(selectLignes).subscribe((lignes) => {
      lignes.forEach((l) => {
        if (l.jeu.id_jeu == this.jeu().id_jeu) {
          this.quantiteCommandee = l.quantite;
        }
      });
    });
  }

  estFavori(id: number) {
    return this.favoris().includes(id);
  }

  goToJeu(id: number) {
    this.router.navigate(['/details/', id]);
  }

  ajoutFavori() {
    const jeu = this.jeu();

    if (!this.isLogged) return;

    if (this.estFavori(jeu.id_jeu!)) {
      this.favorisService.removeFavori(jeu.id_jeu!, this.user?.id!).subscribe(() => {
        this.favoris.set(this.favoris().filter((id) => id !== jeu.id_jeu));
      });
    } else {
      this.favorisService.save({ jeuDto: jeu, utilisateurDto: this.user! }).subscribe(() => {
        this.favoris.set([...this.favoris(), jeu.id_jeu!]);
      });
    }
  }

  ajoutPanier() {
    if (this.quantiteCommandee < this.jeu().stock) {
      this.store.dispatch(addProduit({ lc: { jeu: this.jeu(), quantite: 1, panier: {} } }));
    }
  }

  retraitPanier(id: number) {
    if (this.quantiteCommandee == 1) {
      this.quantiteCommandee = 0;
    }
    this.store.dispatch(removeProduit({ id: id }));
  }
}
