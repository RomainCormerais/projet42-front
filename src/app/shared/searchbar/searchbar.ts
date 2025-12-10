import { Component, computed, EventEmitter, input, Output, signal } from '@angular/core';
import { Jeu } from '../../models/jeu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  imports: [],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.css',
})
export class SearchbarComponent {
  jeux = input.required<Jeu[]>();

  query = signal('');
  activeIndex = signal(-1);

  @Output() selectedJeu = new EventEmitter<Jeu>();

  resultats = computed(() => {
    const q = this.query().toLowerCase();
    if (!q) return [];

    return this.jeux().filter((j) => j.nom_jeu.toLowerCase().includes(q));
  });

  constructor(private router: Router) {}

  search($event: KeyboardEvent) {
    const max = this.resultats().length - 1;

    console.log($event);
  }

  choixJeu(jeu: Jeu) {
    this.selectedJeu.emit(jeu);
    this.query.set('');
    this.activeIndex.set(-1);
  }
}
