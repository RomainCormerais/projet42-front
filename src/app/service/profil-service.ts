import { Injectable } from '@angular/core';
import { GenericService } from './generic';
import { Utilisateur } from '../models/utilisateur';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProfilService extends GenericService<Utilisateur> {
  constructor(http: HttpClient) {
    super(http, '/profile');
  }

  getUtilisateur(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(environment.BACKEND_URL + this.path);
  }

  updateProfil(data: Partial<Utilisateur>): Observable<void> {
    return this.http.put<void>(environment.BACKEND_URL + this.path, data);
  }
}
