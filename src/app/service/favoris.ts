import { Injectable } from '@angular/core';
import { GenericService } from './generic';
import { HttpClient } from '@angular/common/http';
import { Favori } from '../models/favori';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FavorisService extends GenericService<Favori> {
  constructor(http: HttpClient) {
    super(http, '/favoris')
  }

  getFavorisByUserId(id: number): Observable<Favori[]> {
    return this.http.get<Favori[]>(`${environment.BACKEND_URL}${this.path}/user/${id}`)
  }
  
  removeFavori(id_jeu: number, id_user: number) {
    return this.http.delete<void>(`${environment.BACKEND_URL}${this.path}/${id_jeu}/${id_user}`)

  }

}
