import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-eprescription-list',
  templateUrl: './eprescription-list.component.html',
  styleUrls: ['./eprescription-list.component.css']
})
export class EprescriptionListComponent implements OnInit {
  eprescriptions: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadEprescriptions();
  }

  loadEprescriptions(): void {
    this.dataService.getAllEprescriptions().subscribe(
      (data: any[]) => {
        this.eprescriptions = data;
      },
      (error) => {
        console.error('Error fetching e-prescriptions', error);
      }
    );
  }
}