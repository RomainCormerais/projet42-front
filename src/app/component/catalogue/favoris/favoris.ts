import { Component, OnInit, signal } from '@angular/core';
import { Favori } from '../../../models/favori';
import { FavorisService } from '../../../service/favoris';
import { Utilisateur } from '../../../models/utilisateur';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoriCardComponent } from '../favori-card/favori-card';

@Component({
  selector: 'app-favoris',
  imports: [CommonModule, FavoriCardComponent],
  templateUrl: './favoris.html',
  styleUrl: './favoris.css',
})
export class FavorisComponent implements OnInit {

  favoris = signal<Favori[]>([])
  logged = localStorage.getItem('user')


  constructor(private fs: FavorisService) {
  }

  ngOnInit(): void {
    if (this.logged != null) {
      let user = JSON.parse(this.logged)
      this.fs.getFavorisByUserId(user.id!).subscribe({
        next: res => {
          this.favoris.set(res)
        }
      })
    }
  }

  supprimerFavori(favori: Favori) {
    this.fs.removeFavori(favori.jeuDto.id_jeu!, favori.utilisateurDto.id!).subscribe({
      next: () => {
        this.favoris.set(this.favoris().filter((f) => 
            (f.jeuDto != favori.jeuDto && f.utilisateurDto != favori.utilisateurDto) 
      ))
      }
    }
    )
  }
}
