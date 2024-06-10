import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AdminService } from '../services/admin.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface Doctor {
  id: number;
  full_name: string;
  appointment_type: string;
  
}

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/api/v1';
  
  doctors: Doctor[] = [];
  searchQuery: string = '';

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.dataService.getAllDoctors().pipe(
      catchError((error) => {
        console.error('Error fetching doctors:', error);
        return of([]); // Return empty array if there's an error
      })
    ).subscribe((data: any) => {
      this.doctors = data as Doctor[];
    });
  }
  
  searchDoctors(query: string): void {
    if (query.trim() !== '') {
      this.dataService.searchDoctors(query).pipe(
        catchError((error) => {
          console.error('Error searching doctors:', error);
          return of([]); // Return empty array if there's an error
        })
      ).subscribe((data: any) => {
        this.doctors = data as Doctor[];
      });
    } else {
      this.loadDoctors(); // If search query is empty, load all doctors
    }
  }

  deleteDoctor(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteDoctor(id).subscribe(
          (response: any) => {
            Swal.fire(
              'Deleted!',
              'Doctor has been deleted.',
              'success'
            );
            this.doctors = this.doctors.filter(doctor => doctor.id !== id);
          },
          (error: any) => {
            Swal.fire(
              'Error!',
              'An error occurred while deleting the doctor.',
              'error'
            );
          }
        );
      }
    });
  }

  editDoctor(id: number): void {
    this.router.navigate(['/edit-doctor', id]);
  }
}