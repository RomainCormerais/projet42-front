import { Component, OnInit, signal } from '@angular/core';
import { LignePanier } from '../../../models/ligne-panier';
import { Panier } from '../../../models/panier';
import { Utilisateur } from '../../../models/utilisateur';
import { PanierService } from '../../../service/panier';
import { LignePanierService } from '../../../service/ligne-panier';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectLignes } from '../../../stores/panier.selector';
import { addProduit, removeAllProduit, removeProduit } from '../../../stores/panier.action';
import { Jeu } from '../../../models/jeu';

@Component({
  selector: 'app-panier',
  imports: [CommonModule],
  templateUrl: './panier.html',
  styleUrl: './panier.css',
})
export class PanierComponent implements OnInit {
  panier = signal<Panier>({});
  noUserPanier: Panier = {};
  lignes = signal<LignePanier[]>([]);
  logged: string = localStorage.getItem('user') ?? '';
  utilisateur: Utilisateur = {
    id: 0,
    adresse: '',
    adresseMail: '',
    isAdmin: false,
    nomUtilisateur: '',
  };
  totalPanier = signal<number>(0);

  constructor(private ps: PanierService, private lps: LignePanierService, private store: Store) {
    this.store.select(selectLignes).subscribe((lignes) => this.lignes.set(lignes));
    this.calculateTotal();
  }

  ngOnInit(): void {
    // if (this.logged != '') {
    //   this.utilisateur = JSON.parse(this.logged)
    //   this.ps.getPanierByUser(Number(this.utilisateur.id)).subscribe({
    //     next: res => {
    //       this.panier.set(res)
    //       if (this.panier().id != undefined) {
    //         this.lps.getLignesByPanierId(this.panier().id!).subscribe({
    //           next: res => {
    //             console.log(res)
    //             this.lignes.set(res)
    //             this.calculateTotal()
    //           }
    //         })
    //       }
    //     }
    //   })
    // } else {
    // }
  }

  calculateTotal() {
    let acc = 0;
    for (let ligne of this.lignes()) {
      acc += ligne.jeu.prix * ligne.quantite;
    }
    this.totalPanier.set(acc);
  }
  retirerDuPanier(id: number) {
    this.store.dispatch(removeAllProduit({ id: id }));
    this.calculateTotal();
  }
  ajoutPanier(lc: LignePanier) {
    if (lc.quantite < lc.jeu.stock) {
      this.store.dispatch(addProduit({ lc: { jeu: lc.jeu, quantite: 1, panier: {} } }));
      this.calculateTotal();
    }
  }
  retraitPanier(id: number) {
    this.store.dispatch(removeProduit({ id: id }));
    this.calculateTotal();
  }
  addDisable(lc:LignePanier): boolean {
    return  lc.quantite < lc.jeu.stock ? false : true;
  }
}
