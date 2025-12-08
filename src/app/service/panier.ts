import { Injectable } from '@angular/core';
import { GenericService } from './generic';
import { HttpClient } from '@angular/common/http';
import { Panier } from '../models/panier';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PanierService extends GenericService<Panier> {
  constructor(http: HttpClient) {
    super(http, 'paniers')
  }

  getPanierByUser(id : number) : Observable<Panier> {
    return this.http.get<Panier>(`${environment.BACKEND_URL}/${this.path}/user/${id}`)
  }
}
