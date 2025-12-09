import { Injectable } from '@angular/core';
import { GenericService } from './generic';
import { Utilisateur } from '../models/utilisateur';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProfilService extends GenericService<Utilisateur> {
  constructor(http: HttpClient) {
    super(http, '/utilisateurs');
  }

  changeMotDePasse(id: number, datas: { currentMotDePasse: string; newMotDePasse: string }) {
    return this.http.put(`${environment.BACKEND_URL}/utilisateurs/${id}/change-password`, datas, {
      responseType: 'text',
    });
  }
}
