import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-register-doctor',
  templateUrl: './admin-register-doctor.component.html',
  styleUrls: ['./admin-register-doctor.component.css']
})
export class AdminRegisterDoctorComponent {
  doctor = {
    username: '',
    password: '',
    email: '',
    doctor_id: ''
  };

  doctors = [
    { id: 1, name: 'Dr. Llorenia Muir-Green', appointment_type: 'Dermatologist' },
    { id: 2, name: 'Dr. Tasque Brown-McCalla', appointment_type: 'Family Physician' },
    { id: 3, name: 'Dr. Edmond Miller', appointment_type: 'Family Physician' },
    { id: 4, name: 'Dr. Orville Nembhard', appointment_type: 'Family Physician' },
    { id: 5, name: 'Ms. Maya Tyson-Young', appointment_type: 'Physiotherapist' },
    { id: 6, name: 'Ms. Beverley Anthony', appointment_type: 'Dietitian' },
    { id: 7, name: 'Dr. Camille Christian', appointment_type: 'Cardiologist' },
    { id: 8, name: 'Dr. Phillip Brown', appointment_type: 'ECG Heart Test' },
    { id: 9, name: 'Dr. Debbie Thompson', appointment_type: 'Dermatologist' },
    { id: 10, name: 'Dr. Patricia Lynn', appointment_type: 'Paediatrician' },
    { id: 11, name: 'Dr. Annetta Wishart', appointment_type: 'Family Physician' }
  ];

  constructor(private adminService: AdminService, private router: Router) {}

  registerDoctor(): void {
    console.log('Registering doctor with data:', this.doctor); // Log the payload data
    this.adminService.registerDoctor(this.doctor).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Doctor Registered',
          text: 'The doctor has been successfully registered!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/admin-dboard']);
      },
      error => {
        console.error('Error registering doctor:', error);
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error.error.message || 'Unable to register the doctor. Please try again.'
        });
      }
    );
  }
  
}