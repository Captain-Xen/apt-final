import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient, private authService: AuthService) {}

  searchDoctors(query: string): Observable<any> {
  const token = this.authService.getToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const params = new HttpParams().set('query', query);

  return this.http.get(`${this.apiUrl}/doctors/search`, { headers, params });
}
// searchDoctors(query: string): Observable<any> {
//     const token = this.authService.getToken();
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     const body = { query }; // Search query in request body
  
//     return this.http.post(`${this.apiUrl}/doctors/search`, body, { headers });
//   }
  
  

  getAllDoctors() {
    return this.http.get(`${this.apiUrl}/doctors`);
  }

  getAllPatients() {
    return this.http.get(`${this.apiUrl}/patients`);
  }

  getPatientsByDoctor(doctorId: string) {
    return this.http.get(`${this.apiUrl}/doctors/${doctorId}/patients`);
  }

  getAllAppointments() {
    return this.http.get(`${this.apiUrl}/appointments`);
  }

  getAppointmentById(appointmentId: string) {
    return this.http.get(`${this.apiUrl}/appointments/${appointmentId}`);
  }

  createEPrescription(prescriptionData: any) {
    return this.http.post(`${this.apiUrl}/eprescriptions`, prescriptionData);
  }

  updateEPrescription(prescriptionId: string, updatedPrescription: string) {
    return this.http.put(`${this.apiUrl}/eprescriptions/${prescriptionId}`, { prescription: updatedPrescription });
  }

  deleteEPrescription(prescriptionId: string) {
    return this.http.delete(`${this.apiUrl}/eprescriptions/${prescriptionId}`);
  }

  getDoctorProfile(doctorId: string) {
    return this.http.get(`${this.apiUrl}/doctors/${doctorId}`);
  }

  getUpcomingAppointmentsForDoctor(doctorId: string) {
    return this.http.get(`${this.apiUrl}/doctors/${doctorId}/upcoming-appointments`);
  }
}
