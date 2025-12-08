import { Editeur } from './editeur';

export interface Jeu {
  id_jeu?: number;
  nom_jeu: string;
  description_jeu: string;
  image: string;
  prix: number;
  stock: number;
  editeurDto: Editeur;
}
