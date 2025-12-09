import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Favori } from '../../../models/favori';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favori-card',
  imports: [RouterLink],
  templateUrl: './favori-card.html',
  styleUrl: './favori-card.css',
})
export class FavoriCardComponent {
  @Input() favori : Favori = {jeuDto: {
    id_jeu: 0,
    nom_jeu: '',
    description_jeu: '',
    image: '',
    prix: 0,
    stock: 0,
    editeurDto: {
      nom_editeur: ''
    }
  }, utilisateurDto: {
    adresse: '',
    adresseMail: '',
    isAdmin: false,
    nomUtilisateur: ''
  }}

  @Output() supprimer = new EventEmitter<Favori>()

  supprimerFavori(favori : Favori) {
    this.supprimer.emit(favori)
  }

}
