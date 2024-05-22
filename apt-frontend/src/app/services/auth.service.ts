import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/v1'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  loginAdmin(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  loginDoctor(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login-doctor`, { username, password });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists, false otherwise
  }

  getAdminUsername(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.username;
    }
    return '';
  }

  // remember to add methods for handling tokens, registration, etc.
}
