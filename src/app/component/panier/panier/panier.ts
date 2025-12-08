import { Component, OnInit, signal } from '@angular/core';
import { LignePanier } from "../../../models/ligne-panier";
import { Panier } from '../../../models/panier';
import { Utilisateur } from '../../../models/utilisateur';
import { PanierService } from '../../../service/panier';
import { LignePanierService } from '../../../service/ligne-panier';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-panier',
  imports: [CommonModule],
  templateUrl: './panier.html',
  styleUrl: './panier.css',
})
export class PanierComponent implements OnInit {
  panier = signal<Panier>({})
  noUserPanier: Panier = {}
  lignes = signal<LignePanier[]>([])
  logged: string = localStorage.getItem('user') ?? ''
  utilisateur: Utilisateur = { id: 0, adresse: '', adresseMail: '', isAdmin: false, nomUtilisateur: '' }

  totalPanier = 0

  constructor(private ps: PanierService, private lps: LignePanierService) { }

  ngOnInit(): void {
    if (this.logged != '') {
      this.utilisateur = JSON.parse(this.logged)
      this.ps.getPanierByUser(Number(this.utilisateur.id)).subscribe({
        next: res => {
          this.panier.set(res)
          if (this.panier().id != undefined) {
            this.lps.getLignesByPanierId(this.panier().id!).subscribe({
              next: res => {
                console.log(res)
                this.lignes.set(res)
                this.calculateTotal()
              }
            })
          }
        }
      })
    }
  }

  calculateTotal() {
    for ( let ligne of this.lignes() ) {
      this.totalPanier += ligne.jeu.prix * ligne.quantite
    }
  }

}
