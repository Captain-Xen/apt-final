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
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    appointmentType: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: ''
  };

  doctors = [
    { id: 1, name: 'Dr. Llorenia Muir-Green', type: 'Dermatologist' },
    { id: 2, name: 'Dr. Tasque Brown-McCalla', type: 'Family Physician' },
    // Add more doctors here as per your database
  ];

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
    this.appointmentService.bookAppointment(this.appointment).subscribe(
      (response: any) => {
        // Display success alert
        Swal.fire({
          icon: 'success',
          title: 'Appointment Booked',
          text: 'Your appointment has been successfully booked!',
          showConfirmButton: false,
          timer: 1500
        });

        // Redirect to the homepage or another page after a short delay
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      (error: any) => {
        // Display error alert
        Swal.fire({
          icon: 'error',
          title: 'Booking Failed',
          text: error.error.message || 'Unable to book the appointment. Please try again.'
        });
      }
    );
  }
}
