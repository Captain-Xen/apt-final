import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Pipe, PipeTransform } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})

export class PatientsListComponent implements OnInit {
  patients: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getPatients();
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
}
