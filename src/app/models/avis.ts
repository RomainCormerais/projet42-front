import { Jeu } from './jeu';
import { Utilisateur } from './utilisateur';

export interface Avis {
  id?: number;
  contenu: string;
  date: Date;
  note: number;
  utilisateur: Utilisateur;
  jeu: Jeu;
}
