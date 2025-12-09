import { Component, computed, inject, input, signal } from '@angular/core';
import { Jeu } from '../../../../models/jeu';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../service/auth';
import { FavorisService } from '../../../../service/favoris';



@Component({
  selector: 'app-jeu-card',
  imports: [RouterLink],
  templateUrl: './jeu-card.html',
  styleUrl: './jeu-card.css',
})
export class JeuCardComponent {
  jeu = input.required<Jeu>();
  favoris = signal<number[]>([]);

  favorisService = inject(FavorisService);
  authService = inject(AuthService);

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
  }

  estFavori(id: number) {
    return this.favoris().includes(id);
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
}
