import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/api/v1/appointments'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  bookAppointment(appointment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/book`, appointment);
  }

  // Add other appointment-related methods as needed
}
