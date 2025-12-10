import { Component, OnDestroy, signal } from '@angular/core';
import { LignePanier } from '../../../models/ligne-panier';
import { Panier } from '../../../models/panier';
import { Utilisateur } from '../../../models/utilisateur';
import { PanierService } from '../../../service/panier';
import { LignePanierService } from '../../../service/ligne-panier';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectLignes } from '../../../stores/panier.selector';
import { addProduit, removeAllProduit, removeProduit } from '../../../stores/panier.action';
import { RouterLink } from '@angular/router';
import { concat, Observable, Subscription } from 'rxjs';



@Component({
  selector: 'app-panier',
  imports: [CommonModule, RouterLink],
  templateUrl: './panier.html',
  styleUrl: './panier.css',
})
export class PanierComponent implements OnDestroy {
  panier = signal<Panier>({});
  noUserPanier: Panier = {};
  lignes = signal<LignePanier[]>([]);
  logged: string = localStorage.getItem('user') ?? '';
  utilisateur: Utilisateur = {
    id: 0,
    adresse: '',
    adresseMail: '',
    admin: false,
    nomUtilisateur: '',
  };
  totalPanier = signal<number>(0);
  storeSubscription: Subscription | null = null;
  ligneSubscription: Subscription | null = null;
  panierSubscription: Subscription | null = null;
  saveSubscription: Subscription | null = null;
  addSubscription: Subscription[] = [];

  constructor(private ps: PanierService, private lps: LignePanierService, private store: Store) {
    this.storeSubscription = this.store
      .select(selectLignes)
      .subscribe((lignes) => this.lignes.set(lignes));
    this.calculateTotal();
    if (this.logged != '') {
      this.utilisateur = JSON.parse(this.logged);
      this.panierSubscription = ps
        .getPanierByUser(Number(this.utilisateur.id))
        .subscribe((panier) => {
          this.panier.set(panier);
        });
    }
  }

  ngOnDestroy(): void {
    this.storeSubscription?.unsubscribe();
    this.ligneSubscription?.unsubscribe();
    this.addSubscription.forEach((el) => el.unsubscribe());
    this.panierSubscription?.unsubscribe();
    this.saveSubscription?.unsubscribe();
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

  addDisable(lc: LignePanier): boolean {
    return lc.quantite < lc.jeu.stock ? false : true;
  }

  sauvegardePanier() {
    let tabObservable: Observable<LignePanier>[] = [];
    this.lignes().forEach((element) => {
      tabObservable.push(
        this.lps.save({ jeu: element.jeu, quantite: element.quantite, panier: this.panier() })
      );
    });
    this.saveSubscription = concat(
      this.ps.emptyPanierById(this.panier().id!),
      ...tabObservable
    ).subscribe({
      next: (res) => {},
      error: (err) => {
        console.log(err);
      },
    });
  }

  chargerPanier() {
    if (
      this.lignes().length == 0 ||
      confirm('Voulez-vous remplacer le panier actuel par celui en ligne ?')
    ) {
      if (this.logged != '') {
        this.ligneSubscription = this.lps
          .getLignesByPanierId(this.panier().id!)
          .subscribe((res) => {
            this.lignes().forEach((element) => {
              this.store.dispatch(removeAllProduit({ id: element.jeu.id_jeu! }));
            });
            res.forEach((l) => this.store.dispatch(addProduit({ lc: l })));
          });
      }
    }
  }
}
