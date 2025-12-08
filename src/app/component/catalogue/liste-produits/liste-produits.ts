import { Component, OnInit, signal } from '@angular/core';
import { Jeu } from '../../../models/jeu';
import { JeuService } from '../../../service/jeu';
import { EditeurService } from '../../../service/editeur';
import { Editeur } from '../../../models/editeur';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-liste-produits',
  imports: [RouterLink],
  templateUrl: './liste-produits.html',
  styleUrl: './liste-produits.css',
})
export class ListeProduitsComponent implements OnInit {
  listeJeux = signal<Jeu[]>([]);
  error = signal<string | null>(null);
  constructor(private jeuService: JeuService, private editeurService: EditeurService) {}
  ngOnInit(): void {
    this.jeuService.findAll().subscribe({
      next: (res) => {       
        this.listeJeux.set(res);
      },
      error: (err) => {
        this.error.set('Problème de récupération des jeux');
        console.log(err);
      },
    });
  }
}
