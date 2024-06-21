import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  searchDoctors(query: string): Observable<any> {
    const body = { query }; // Search query in request body
    return this.http.post(`${this.apiUrl}/doctors/search`, body);
  }

  addPatient(patientData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/patients`, patientData);
  }

  updatePatient(patientId: number, patientData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/patients/${patientId}`, patientData);
  }

  deletePatient(patientId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/patients/${patientId}`);
  }

  getPatientById(patientId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/patients/${patientId}`);
  }

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

  getAllEprescriptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/e-prescriptions`);
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

  getDoctorProfile(doctorId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctors/${doctorId}`);
  }

  getUpcomingAppointmentsForDoctor(doctorId: string) {
    return this.http.get(`${this.apiUrl}/doctors/${doctorId}/upcoming-appointments`);
  }
}
