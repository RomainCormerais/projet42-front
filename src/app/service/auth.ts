import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from '../models/utilisateur';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotExpr } from '@angular/compiler';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string;
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.currentUser != null);

  isConnected$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.apiUrl = environment.BACKEND_URL + '/auth';
  }

  login(credentials: { email: string; password: string }) {
    this.isLoggedInSubject.next(true);
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  logout() {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  register(datas: { username: string; email: string; password: string; adresse: string }) {
    return this.http.post(this.apiUrl + '/register', datas, {
      responseType: 'text',
    });
  }

  get currentUser(): Utilisateur | null {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

}
