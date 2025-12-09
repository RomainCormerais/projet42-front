import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PanierState } from "./panier.state";

export const selectPanierState = createFeatureSelector<PanierState>('panier');

export const selectLignes = createSelector(selectPanierState, state => state.lignes);
export const selectNombreProduit = createSelector(
  selectPanierState,
  state => state.lignes.length,
);