// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/v1';
  private authStatus = new BehaviorSubject<boolean>(false);
  private adminStatus = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.checkInitialAuthStatus();
  }

  private checkInitialAuthStatus(): void {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = this.decodeToken(token);
      console.log('Decoded token:', decodedToken); 
      this.authStatus.next(true);
      this.adminStatus.next(decodedToken.role === 'admin');
    }
  }
  

  getLoggedInDoctorId(): number | null {
    const doctorId = localStorage.getItem('doctorId');
    return doctorId ? parseInt(doctorId, 10) : null;
  }

  loginAdmin(username: string, password: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
    map((response: any) => {
      if (response && response.token) {
        this.saveToken(response.token);
        const decodedToken: any = this.decodeToken(response.token);
        console.log('Admin login decoded token:', decodedToken); // Add this line to debug
        this.authStatus.next(true);
        this.adminStatus.next(decodedToken.role === 'admin');
        return response;
      }
      return null;
    })
  );
}

  loginDoctorUser(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login-doctor`, { username, password }).pipe(
      map((response: any) => {
        if (response && response.token && response.doctorId) {
          console.log('Login response:', response);
          this.saveToken(response.token);
          localStorage.setItem('doctorId', response.doctorId);
          this.authStatus.next(true);
          this.adminStatus.next(false); 
          return response; 
        }
        return null; // returns null
      })
    );
  }

  getAdminUsername(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = this.decodeToken(token);
      return decodedToken.username; 
    }
    return null;
  }

  isLoggedIn(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  isAdmin(): Observable<boolean> {
    return this.adminStatus.asObservable();
  }

  isAdminBoolean(): boolean {
    return this.adminStatus.value;
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('doctorId');
    this.authStatus.next(false);
    this.adminStatus.next(false);
  }

  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }
}
