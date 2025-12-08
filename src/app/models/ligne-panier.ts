import { Jeu } from './jeu';
import { Panier } from './panier';

export interface LignePanier {
  panier: Panier;
  jeu: Jeu;
  quantite: number;
}
