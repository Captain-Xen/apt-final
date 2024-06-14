
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent implements OnInit {
  patientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    this.patientForm = this.fb.group({
      fullName: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      doctorId: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  addPatient(): void {
    if (this.patientForm.valid) {
      this.dataService.addPatient(this.patientForm.value).subscribe(
        response => {
          Swal.fire('Success', 'Patient added successfully', 'success').then(() => {
            this.router.navigate(['/patients']);
          });
        },
        error => {
          Swal.fire('Error', 'Failed to add patient', 'error');
        }
      );
    }
  }
}
