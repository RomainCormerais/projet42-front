import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JeuService } from '../../../service/jeu';
import { Jeu } from '../../../models/jeu';
import { CommonModule } from '@angular/common';
import { Avis } from '../../../models/avis';
import { AvisService } from '../../../service/avis';
import { AvisComponent } from '../avis/avis';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../service/auth';
import { selectLignes } from '../../../stores/panier.selector';
import { addProduit, removeProduit } from '../../../stores/panier.action';

@Component({
  selector: 'app-fiche-jeu',
  imports: [CommonModule, AvisComponent],
  templateUrl: './fiche-jeu.html',
  styleUrl: './fiche-jeu.css',
})
export class FicheJeuComponent implements OnInit {
  idJeu: number = 0;
  jeu = signal<Jeu>({
    nom_jeu: '',
    description_jeu: '',
    image: '',
    prix: 0,
    stock: 0,
    editeurDto: {
      nom_editeur: '',
    },
  });

  quantiteCommandee: number = 0;
  isAdmin: boolean = false;
  isConnected: boolean = false;

  listeAvis = signal<Avis[]>([]);

  constructor(
    private route: ActivatedRoute,
    private jeuService: JeuService,
    private avisService: AvisService,
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idJeu = Number(params.get('id')) ?? 0;
    });
    if (this.idJeu != 0) {
      this.jeuService.findById(this.idJeu).subscribe({
        next: (res) => {
          this.jeu.set(res);
        },
      });
    }
    this.avisService.getAvisByJeuId(this.idJeu).subscribe({
      next: (res) => {
        this.listeAvis.set(res);
      },
    });

    if (this.authService.currentUser != null) {
      this.isConnected = true;
      this.isAdmin = this.authService.currentUser.admin;
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

  modifierJeu(jeu: Jeu) {
    this.router.navigate(['/catalogue/ajout', jeu.id_jeu!]);
  }

  goToPanier() {
    this.router.navigateByUrl('panier');
  }
}
