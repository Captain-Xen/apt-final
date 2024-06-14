import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-dboard',
  templateUrl: './doctor-dboard.component.html',
  styleUrls: ['./doctor-dboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  doctorId: number | null = null;
  doctorProfile: any = null;
  upcomingAppointments: any[] = [];
  assignedPatients: any[] = [];

  constructor(
    private dataService: DataService,
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.doctorId = this.getLoggedInDoctorId();
    if (this.doctorId) {
      this.getDoctorProfile(this.doctorId);
      this.getUpcomingAppointments(this.doctorId);
      this.getAssignedPatients(this.doctorId);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to get doctor ID. Please log in again.'
      });
      this.router.navigate(['/doctor-login']);
    }
  }

  getLoggedInDoctorId(): number | null {
    const doctorId = localStorage.getItem('doctorId');
    return doctorId ? parseInt(doctorId, 10) : null;
  }

  getDoctorProfile(doctorId: number): void {
    this.dataService.getDoctorProfile(doctorId.toString()).subscribe(
      (data: any) => {
        this.doctorProfile = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: `Error fetching doctor profile for ID ${doctorId}`,
          text: error.message
        });
      }
    );
  }

  getUpcomingAppointments(doctorId: number): void {
    this.dataService.getUpcomingAppointmentsForDoctor(doctorId.toString()).subscribe(
      (data: any) => {
        console.log('Upcoming appointments:', data);
        this.upcomingAppointments = data.map((appointment: any) => ({
          patientName: `${appointment.first_name} ${appointment.last_name}`,
          date: appointment.appointment_date, 
          time: appointment.appointment_time 
        }));
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error fetching upcoming appointments',
          text: error.message
        });
      }
    );
  }

  getAssignedPatients(doctorId: number): void {
    this.dataService.getPatientsByDoctor(doctorId.toString()).subscribe(
      (data: any) => {
        console.log('Assigned patients:', data);
        this.assignedPatients = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error fetching assigned patients',
          text: error.message
        });
      }
    );
  }

  createEPrescription(patientId: number | null): void {
    if (patientId) {
      this.router.navigate(['/create-eprescription', patientId]);
    } else {
      this.router.navigate(['/eprescriptions']);  // Adjust this route as necessary
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  logout(): void {
    this.authService.logout();
    Swal.fire('Logged out', 'You have been logged out successfully', 'success').then(() => {
      this.router.navigate(['/login/superuser']); 
    });
  }
}
