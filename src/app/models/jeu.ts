import { Editeur } from './editeur';

export interface Jeu {
  id?: number;
  nomJeu: string;
  descriptionJeu: string;
  image: string;
  prix: number;
  stock: number;
  editeur: Editeur;
}
