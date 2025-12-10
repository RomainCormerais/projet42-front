import { Injectable } from '@angular/core';
import { GenericService } from './generic';
import { HttpClient } from '@angular/common/http';
import { Avis } from '../models/avis';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AvisService extends GenericService<Avis> {
  constructor(http: HttpClient) {
    super(http, '/avis')
  }

  getAvisByJeuId(id_jeu: number) : Observable<Avis[]> {
    return this.http.get<Avis[]>(`${environment.BACKEND_URL}${this.path}/jeu/${id_jeu}`)
  }
}
