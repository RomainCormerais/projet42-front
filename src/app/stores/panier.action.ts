import { createAction, props } from '@ngrx/store';
import { LignePanier } from '../models/ligne-panier';

export const increment = createAction('[Panier] Increment', props<{ nom: string }>());
export const decrement = createAction('[Panier] Decrement', props<{ nom: string }>());
export const removeProduit = createAction('[Panier] RemoveProduit', props<{ id: number }>());
export const removeAllProduit = createAction('[Panier] RemoveAllProduit', props<{ id: number }>());
export const addProduit = createAction('[Panier] AddProduit', props<{ lc: LignePanier }>());