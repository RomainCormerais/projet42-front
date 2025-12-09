import { Component, input, OnDestroy, signal } from '@angular/core';
import { Form, FormsModule } from '@angular/forms';
import { Jeu } from '../../../models/jeu';
import { JeuService } from '../../../service/jeu';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ajout-produit',
  imports: [FormsModule],
  templateUrl: './ajout-produit.html',
  styleUrl: './ajout-produit.css',
})
export class AjoutProduitComponent implements OnDestroy {
  id: number = 0;
  jeu = signal<Jeu>({
    nom_jeu: '',
    description_jeu: '',
    image: '',
    prix: 1,
    stock: 0,
    editeurDto: { nom_editeur: '' },
  });
  label = signal<string>('Ajouter');
  jeuSubscription: Subscription | null = null;
  routeSubscription: Subscription | null = null;
  modifSubscription: Subscription | null = null;
  constructor(
    private route: ActivatedRoute,
    private jeuService: JeuService,
    private router: Router
  ) {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.id = parseInt(params.get('id')!);
        this.jeuSubscription = jeuService.findById(this.id).subscribe((res) => {
          this.jeu.set(res);
          this.label.set('Modifier');
        });
      }
    });
  }
  ngOnDestroy(): void {
    this.jeuSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
    this.modifSubscription?.unsubscribe();
  }
  envoyerDonnees() {
    console.log(this.jeu());
    
    if (this.jeu().id_jeu) {
      this.jeuService.update(this.jeu().id_jeu!, this.jeu()).subscribe({
        next: (res) => {},
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.jeuService.save(this.jeu()).subscribe({
        next: (res) => {},
        error: (err) => {
          console.log(err);
        },
      });
    }
    this.router.navigateByUrl('/catalogue');
  }
}
