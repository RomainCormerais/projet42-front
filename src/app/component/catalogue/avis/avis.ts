import { Component, Input, OnInit } from '@angular/core';
import { Avis } from '../../../models/avis';
import { CommonModule } from '@angular/common';
import { Utilisateur } from '../../../models/utilisateur';
import { Serializer } from '@angular/compiler';

@Component({
  selector: 'app-avis',
  imports: [CommonModule],
  templateUrl: './avis.html',
  styleUrl: './avis.css',
})
export class AvisComponent implements OnInit {
  @Input() avis: Avis = {
    contenu: '',
    date: new Date(),
    note: 0,
    utilisateur: {
      adresse: '',
      adresseMail: '',
      admin: false,
      nomUtilisateur: ''
    },
    jeu: {
      nom_jeu: '',
      description_jeu: '',
      image: '',
      prix: 0,
      stock: 0,
      editeurDto: {
        nom_editeur: ''
      }
    }
  }
  etoiles = '';
  user: Utilisateur = {
    adresse: '',
    adresseMail: '',
    admin: false,
    nomUtilisateur: ''
  }


  ngOnInit(): void {
    this.etoiles = this.starRating()
  }


  starRating() {

    let stars = ''

    for (let i = 0; i < this.avis.note; i++) {
      stars += '<i class="fa-solid fa-star" style="color: #FFD43B;"></i>'
    }
    if (this.avis.note < 5) {
      for (let i = 0; i < 5 - this.avis.note; i++) {
        stars += '<i class="fa-regular fa-star" style="color: #FFD43B;"></i>'
      }
    }

    return stars

  }


}
