import { Component, EventEmitter, input, OnChanges, OnInit, Output, output, signal } from '@angular/core';
import { Jeu } from '../../../models/jeu';
import { Store } from '@ngrx/store';
import { addProduit, removeProduit } from '../../../stores/panier.action';
import { selectLignes } from '../../../stores/panier.selector';
import { Favori } from '../../../models/favori';
import { LoginLogoutService } from '../../../service/login-logout';
import { AuthService } from '../../../service/auth';

@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class DetailComponent implements OnInit {
  jeu = input.required<Jeu>();
  @Output() ajouterFavori = new EventEmitter<Jeu>()
  quantiteCommandee: number = 0;
  onChange = output<void>();
  removeDisable: boolean = true;
  addDisable: boolean = false;
  isConnected: boolean = false

  constructor(private store: Store, private logService: LoginLogoutService, private authService : AuthService) {
  }

  ngOnInit(): void {
    if (this.authService.currentUser != null) {
      this.isConnected = true
    }
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
  }
  retraitPanier(id: number) {
    if (this.quantiteCommandee == 1) {
      this.quantiteCommandee = 0;
    }
    this.store.dispatch(removeProduit({ id: id }));
  }

  ajoutFavori(jeu: Jeu) {
    this.ajouterFavori.emit(jeu)
  }
}
