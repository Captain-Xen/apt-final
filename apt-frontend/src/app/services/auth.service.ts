import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/v1'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  loginAdmin(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  loginDoctor(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login-doctor`, { username, password }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token; // Returns true if token exists, false otherwise
  }

  getAdminUsername(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = this.decodeToken(token);
      return decodedToken.username;
    }
    return '';
  }

  // Save JWT to local storage
  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  // Retrieve JWT from local storage
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Decode JWT
  decodeToken(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }
}
