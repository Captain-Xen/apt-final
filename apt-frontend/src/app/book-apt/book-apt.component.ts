import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-apt',
  templateUrl: './book-apt.component.html',
  styleUrls: ['./book-apt.component.css']
})
export class BookAptComponent {
  appointment = {
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    appointment_type: '',
    doctor_id: '',
    appointment_date: '',
    appointment_time: ''
  };

  originalDoctors = [
    { id: 1, name: 'Dr. Llorenia Muir-Green', type: 'Dermatologist' },
    { id: 2, name: 'Dr. Tasque Brown-McCalla', type: 'Family Physician' },
    { id: 3, name: 'Dr. Edmond Miller', type: 'Family Physician' },
    { id: 4, name: 'Dr. Orville Nembhard', type: 'Family Physician' },
    { id: 5, name: 'Ms. Maya Tyson-Young', type: 'Physiotherapist' },
    { id: 6, name: 'Ms. Beverley Anthony', type: 'Dietitian' },
    { id: 7, name: 'Dr. Camille Christian', type: 'Cardiologist' },
    { id: 8, name: 'Dr. Phillip Brown', type: 'ECG Heart Test' }, 
    { id: 9, name: 'Dr. Debbie Thompson', type: 'Dermatologist' },
    { id: 10, name: 'Dr. Patricia Lynn', type: 'Paediatrician' }
  ];

  doctors = [...this.originalDoctors]; // Copy of original doctors list

  appointmentTypes = [
    'Paediatrician',
    'Family Physician',
    'Dermatologist',
    'Dietitian',
    'Physiotherapist',
    'Special Consultation',
    'ECG Heart Test',
    'Rapid Tests',
    'Cardiologist'
  ];

  constructor(private appointmentService: AppointmentService, private router: Router) {}

  onSubmit(): void {
    this.appointmentService.bookAppointment(this.appointment, { responseType: 'text' }).subscribe(
      response => {
        console.log('Response:', response);
        Swal.fire({
          icon: 'success',
          title: 'Appointment Booked',
          text: 'Your appointment has been successfully booked.',
          showConfirmButton: false,
          timer: 2500
        });
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error => {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Booking Failed',
          text: 'Unable to book the appointment. Please try again.'
        });
      }
    );
  }
  

  filterDoctors(): void {
    this.doctors = this.originalDoctors.filter(
      doctor => doctor.type === this.appointment.appointment_type
    );
  }
}
