import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {
  patientForm: FormGroup;
  patientId: number;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.patientForm = this.fb.group({
      full_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      visit_type: ['', Validators.required],
      apt_date: ['', Validators.required],
      apt_time: ['', Validators.required],
      doctor_id: ['', Validators.required]
    });

    this.patientId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadPatientData();
  }

  loadPatientData(): void {
    this.dataService.getPatientById(this.patientId).subscribe(
      (data: any) => {
        this.patientForm.patchValue(data);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error fetching patient data',
          text: error.message
        });
      }
    );
  }

  updatePatient(): void {
    if (this.patientForm.valid) {
      this.dataService.updatePatient(this.patientId, this.patientForm.value).subscribe(
        response => {
          Swal.fire('Success', 'Patient updated successfully', 'success').then(() => {
            this.router.navigate(['/patients']);
          });
        },
        error => {
          Swal.fire('Error', 'Failed to update patient', 'error');
        }
      );
    }
  }
}
