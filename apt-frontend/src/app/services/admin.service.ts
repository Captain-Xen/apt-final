import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api/v1/admin'; // Adjust to your API URL

  constructor(private http: HttpClient) {}

  registerDoctor(doctor: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-doctor`, doctor);
  }

  // Add other admin-related methods as needed
}
