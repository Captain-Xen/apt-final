import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {
  patients: any[] = [];
  isAdmin: boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPatients();
    this.checkAdminStatus();
  }

  checkAdminStatus(): void {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken: any = this.decodeToken(token);
      if (decodedToken && decodedToken.role === 'admin') {
        this.isAdmin = true;
      }
    }
  }

  decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  getPatients(): void {
    this.dataService.getAllPatients().subscribe(
      (data: any) => {
        this.patients = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error fetching patients',
          text: error.message
        });
      }
    );
  }

  addPatient(): void {
    this.router.navigate(['/add-patient']);
  }

  editPatient(patientId: number): void {
    this.router.navigate(['/edit-patient', patientId]);
  }

  confirmDelete(patientId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this patient?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePatient(patientId);
      }
    });
  }

  deletePatient(patientId: number): void {
    this.dataService.deletePatient(patientId).subscribe(
      (response) => {
        Swal.fire('Deleted!', 'Patient has been deleted.', 'success').then(() => {
          this.getPatients(); // Refresh the list
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error deleting patient',
          text: error.message
        });
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
