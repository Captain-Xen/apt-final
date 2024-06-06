import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AdminService } from '../services/admin.service';
import { of } from 'rxjs';

interface Doctor {
  id: number;
  full_name: string;
  appointment_type: string;
  // ... other properties
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

  constructor(private http: HttpClient, private dataService: DataService, private authService: AuthService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.dataService.getAllDoctors().pipe(
      catchError((error) => {
        console.error('Error fetching doctors:', error);
        return of([]); // Return an empty array if there's an error
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
          return of([]); // Return an empty array if there's an error
        })
      ).subscribe((data: any) => {
        this.doctors = data as Doctor[];
      });
    } else {
      this.loadDoctors(); // If search query is empty, load all doctors
    }
  }

  deleteDoctor(id: number): void {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.adminService.deleteDoctor(id).subscribe(
        (response: any) => {
          alert('Doctor deleted successfully!');
          this.doctors = this.doctors.filter(doctor => doctor.id !== id);
        },
        (error: any) => {
          alert('Error deleting doctor');
        }
      );
    }
  }
}