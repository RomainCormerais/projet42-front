import { Injectable } from '@angular/core';
import { GenericService } from './generic';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Jeu extends GenericService<Jeu> {
  constructor(http: HttpClient) {
    super(http, '/catalogue')
  }
}
