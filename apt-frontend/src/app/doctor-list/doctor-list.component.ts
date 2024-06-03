import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  private apiUrl = 'http://localhost:3000/api/v1';
  
  doctors: any[] = [];
  searchQuery: string = '';

  constructor(private http: HttpClient, private dataService: DataService, private authService: AuthService) { }

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
      this.doctors = data;
    });
  }

  searchDoctors(query: string): void {
  if (query.trim() !== '') {
    this.dataService.searchDoctors(query).subscribe((data: any) => {
      this.doctors = data;
    });
  } else {
    this.loadDoctors(); // If search query is empty, load all doctors
  }
}

}
