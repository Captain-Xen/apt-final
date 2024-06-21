import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  appointments: any[] = [];

  constructor(
    private dataService: DataService,
    private datePipe: DatePipe,
    private location: Location
  ) { }

  formatDateTime(dateTime: string): string {
    if (!dateTime) return '';
  
    const dateObj = new Date(dateTime);
    const formattedDate = this.datePipe.transform(dateObj, 'MM/dd/yyyy') || '';
    const formattedTime = this.datePipe.transform(dateObj, 'HH:mm:ss') || '';
  
    return `${formattedDate} ${formattedTime}`;
  }
  
  goBack(): void {
    this.location.back();
  }
  
  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.dataService.getAllAppointments().subscribe(
      (data: any) => {
        this.appointments = data;
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }
}
