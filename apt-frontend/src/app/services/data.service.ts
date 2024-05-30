import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getPatientsByDoctor(doctorId: string) {
    return this.http.get(`/api/doctors/${doctorId}/patients`);
  }

  getAllAppointments() {
    return this.http.get('/api/appointments');
  }

  getAppointmentById(appointmentId: string) {
    return this.http.get(`/api/appointments/${appointmentId}`);
  }

  createEPrescription(prescriptionData: any) {
    return this.http.post('/api/eprescriptions', prescriptionData);
  }

  updateEPrescription(prescriptionId: string, updatedPrescription: string) {
    return this.http.put(`/api/eprescriptions/${prescriptionId}`, { prescription: updatedPrescription });
  }

  deleteEPrescription(prescriptionId: string) {
    return this.http.delete(`/api/eprescriptions/${prescriptionId}`);
  }
}