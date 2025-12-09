import { createReducer, on } from '@ngrx/store';
import { PanierState } from './panier.state';
import { addProduit, removeAllProduit, removeProduit } from './panier.action';

export const initialState: PanierState = {
  lignes: [],
};

export const panierReducer = createReducer(
  initialState,
  on(addProduit, (state, { lc }) => {
    // Si aucune ligne de commande ne concerne le même produit on ajoute une nouvelle ligne
    if (state.lignes.findIndex((l) => l.jeu.id_jeu == lc.jeu.id_jeu) == -1) {
      return { ...state, lignes: [...state.lignes, lc] };
      // Sinon on met à jour la quantité concernée
    } else {
      let lcs = [...state.lignes];
      let thisLc = { ...lcs[lcs.findIndex((l) => l.jeu.id_jeu == lc.jeu.id_jeu)] };
      thisLc.quantite += lc.quantite;
      lcs[lcs.findIndex((l) => l.jeu.id_jeu == lc.jeu.id_jeu)] = thisLc;
      return { ...state, lignes: lcs };
    }
  }),
  on(removeProduit, (state, { id }) => {
    if (state.lignes.findIndex((l) => l.jeu.id_jeu == id) != -1) {
      let lcs = [...state.lignes];
      let thisLc = { ...lcs[lcs.findIndex((l) => l.jeu.id_jeu == id)] };
      if (thisLc.quantite > 1) {
        thisLc.quantite--;
        lcs[lcs.findIndex((l) => l.jeu.id_jeu == id)] = thisLc;
        return { ...state, lignes: lcs };
      } else {
        return { ...state, lignes: [...state.lignes.filter((l) => l.jeu.id_jeu != id)] };
      }
    } else {
      return { ...state };
    }
  }),
  on(removeAllProduit, (state, { id }) => {
    return { ...state, lignes: [...state.lignes.filter((l) => l.jeu.id_jeu != id)] };
  })
);
