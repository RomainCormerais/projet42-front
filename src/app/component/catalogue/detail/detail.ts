import { Component, input, OnInit, signal } from '@angular/core';
import { Jeu } from '../../../models/jeu';
import { Router } from '@angular/router';
import { JeuService } from '../../../service/jeu';

@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class DetailComponent implements OnInit {
  id = input.required<number>();
  jeu = signal<Jeu>({
    nom_jeu: '',
    description_jeu: '',
    image: '',
    prix: 0,
    stock: 0,
    editeurDto: { nom_editeur: '' },
  });
  error = signal<string | null>(null);
  constructor(private router: Router, private jeuService: JeuService) {}
  ngOnInit(): void {
    this.jeuService.findById(this.id()).subscribe({
      next: (res) => {
        this.jeu.set(res);
      },
      error: (err) => {
        this.error.set('Problème de récupération du jeu');
        console.log(err);
      },
    });
  }
  toCatalogue() {
    this.router.navigateByUrl('/catalogue');
  }
}
