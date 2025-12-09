import { Injectable } from '@angular/core';
import { GenericService } from './generic';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { LignePanier } from '../models/ligne-panier';

@Injectable({
  providedIn: 'root',
})
export class LignePanierService extends GenericService<LignePanier> {
  constructor(http: HttpClient) {
    super(http, '/lignes-panier')
  }

  getLignesByPanierId(id : number) {
    return this.http.get<LignePanier[]>(`${environment.BACKEND_URL}${this.path}/panier/${id}`)
  }

}
