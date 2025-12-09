import { Component, input, OnChanges, OnInit, output, signal } from '@angular/core';
import { Jeu } from '../../../models/jeu';
import { Store } from '@ngrx/store';
import { addProduit, removeProduit } from '../../../stores/panier.action';
import { selectLignes } from '../../../stores/panier.selector';

@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class DetailComponent implements OnInit {
  jeu = input.required<Jeu>();
  quantiteCommandee: number = 0;
  onChange = output<void>();
  removeDisable: boolean = true;
  addDisable: boolean = false;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.select(selectLignes).subscribe((lignes) => {
      lignes.forEach((l) => {
        if (l.jeu.id_jeu == this.jeu().id_jeu) {
          this.quantiteCommandee = l.quantite;
        }
      });
    });
  }
  ajoutPanier() {
    if (this.quantiteCommandee < this.jeu().stock) {
      this.store.dispatch(addProduit({ lc: { jeu: this.jeu(), quantite: 1, panier: {} } }));
    }
    this.addDisable = this.quantiteCommandee == this.jeu().stock ? true : false;
    this.removeDisable = this.quantiteCommandee == 0 ? true : false;
  }
  retraitPanier(id: number) {
    if (this.quantiteCommandee == 1) {
      this.quantiteCommandee = 0;
    }
    this.removeDisable = this.quantiteCommandee == 0 ? true : false;
    this.store.dispatch(removeProduit({ id: id }));
  }
}
