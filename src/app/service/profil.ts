import { Injectable } from '@angular/core';
import { GenericService } from './generic';
import { Utilisateur } from '../models/utilisateur';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ProfilService extends GenericService<Utilisateur> {
  constructor(http: HttpClient) {
    super(http, '/utilisateurs');
  }


}
