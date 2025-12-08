import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from '../models/utilisateur';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.BACKEND_URL + '/auth';
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  logout() {
    localStorage.removeItem('user');
  }

  get currentUser(): Utilisateur | null {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }
}
