import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  registerDoctor(doctor: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-doctor`, doctor);
  }

  getDoctors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctors`);
  }

  getDoctorById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctors/${id}`);
  }

  updateDoctor(id: number, doctor: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/doctors/${id}`, doctor);
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/doctors/${id}`);
  }
}
