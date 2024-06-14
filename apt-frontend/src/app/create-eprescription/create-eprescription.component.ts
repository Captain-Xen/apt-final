import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-eprescription',
  templateUrl: './create-eprescription.component.html',
  styleUrls: ['./create-eprescription.component.css']
})
export class CreateEPrescriptionComponent implements OnInit {
  prescriptionForm: FormGroup;
  patientId: number | null = null;
  doctorId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataService: DataService,
    private authService: AuthService,
    private router: Router
  ) {
    this.prescriptionForm = this.fb.group({
      prescription: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.patientId = parseInt(this.route.snapshot.paramMap.get('patientId') || '0', 10);
    this.doctorId = this.authService.getLoggedInDoctorId();

    if (!this.doctorId) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to get doctor ID. Please log in again.'
      });
      this.router.navigate(['/doctor-login']);
    }
  }

  submitPrescription(): void {
    if (this.prescriptionForm.valid && this.patientId && this.doctorId) {
      const prescriptionData = {
        patient_id: this.patientId,
        doctor_id: this.doctorId,
        prescription: this.prescriptionForm.value.prescription,
        date_prescribed: new Date().toISOString().split('T')[0]  // Current date
      };

      this.dataService.createEPrescription(prescriptionData).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'E-Prescription Created',
            text: 'The e-prescription has been created successfully.'
          }).then(() => {
            this.router.navigate(['/doctor-dboard']);
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to create e-prescription. Please try again.'
          });
        }
      );
    }
  }
}
