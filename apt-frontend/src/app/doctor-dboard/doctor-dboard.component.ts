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

  constructor(private dataService: DataService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.doctorId = this.getLoggedInDoctorId();
    if (this.doctorId) {
      this.getDoctorProfile(this.doctorId);
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
        console.log('Doctor profile data:', data); // Log the response data
        this.doctorProfile = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: `Error fetching doctor profile for ID ${doctorId}`,
          text: error.message
        });
        console.error('Error fetching doctor profile:', error);
      }
    );
  }

  logout(): void {
    this.authService.logout();
    Swal.fire('Logged out', 'You have been logged out successfully', 'success').then(() => {
      this.router.navigate(['/doctor-login']); 
    });
  }
}
