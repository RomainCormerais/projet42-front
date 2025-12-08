import { Injectable } from '@angular/core';
import { GenericService } from './generic';
import { HttpClient } from '@angular/common/http';
import { Editeur } from '../models/editeur';

@Injectable({
  providedIn: 'root',
})
export class EditeurService extends GenericService<Editeur> {
  constructor(http: HttpClient) {
    super(http, '/editeur')
  }
}
