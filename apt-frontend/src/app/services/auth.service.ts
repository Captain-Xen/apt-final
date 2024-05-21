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

  // Other authentication methods for doctors or additional functionality
  loginDoctor(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login-doctor`, { username, password });
  }

  // You can also add methods for handling tokens, registration, etc.
}
