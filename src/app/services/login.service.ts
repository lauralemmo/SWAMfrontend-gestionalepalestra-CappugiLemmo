import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginModel} from '../models/login.model';

@Injectable({
  providedIn: 'root',
})


export class LoginService {
  private apiUrl = 'http://localhost:8080/SWAM-Cappugi-Lemmo-1.0-SNAPSHOT/api/auth';

  constructor(private http: HttpClient) {}

  login(login: LoginModel) {
    return this.http.post(`${this.apiUrl}/login`, login);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
