import { Jeu } from './jeu';
import { Utilisateur } from './utilisateur';

export interface Favori {
  id?: number;
  jeu: Jeu;
  utilisateur: Utilisateur;
}
