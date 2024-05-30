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
      this.authStatus.next(true);
      this.adminStatus.next(decodedToken.role === 'admin');
    }
  }

  loginAdmin(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      map((response: any) => {
        if (response && response.token) {
          this.saveToken(response.token);
          const decodedToken: any = this.decodeToken(response.token);
          this.authStatus.next(true);
          this.adminStatus.next(decodedToken.role === 'admin');
          return true;
        }
        return false;
      })
    );
  }

  loginDoctorUser(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login-doctor`, { username, password }).pipe(
      map((response: any) => {
        if (response && response.token) {
          this.saveToken(response.token);
          this.authStatus.next(true);
          // Assuming doctors do not have admin privileges
          this.adminStatus.next(false);
          return true;
        }
        return false;
      })
    );
  }

  getAdminUsername(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = this.decodeToken(token);
      return decodedToken.username;  // Assuming 'username' is stored in the token
    }
    return null;
  }

  isLoggedIn(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  isAdmin(): Observable<boolean> {
    return this.adminStatus.asObservable();
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.authStatus.next(false);
    this.adminStatus.next(false);
  }

  private saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  private getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  private decodeToken(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }
}

