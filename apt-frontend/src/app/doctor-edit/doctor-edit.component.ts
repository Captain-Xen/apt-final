import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent implements OnInit {
  doctor: any = {
    full_name: '',
    appointment_type: ''
  };
  appointmentTypes = [
    'Paediatrician',
    'Family Physician',
    'Dermatologist',
    'Dietitian',
    'Physiotherapist',
    'Special Consultation',
    'ECG Heart Test',
    'Rapid Tests',
    'Cardiologist'
  ];
  doctorId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.doctorId = this.route.snapshot.params['id'];
    this.adminService.getDoctorById(this.doctorId).subscribe((data: any) => {
      this.doctor = data;
    });
  }

  onSubmit(): void {
    this.adminService.updateDoctor(this.doctorId, this.doctor).subscribe(
      (response: any) => {
        Swal.fire('Success', 'Doctor updated successfully!', 'success');
        this.router.navigate(['/doctor-list']);
      },
      (error: any) => {
        Swal.fire('Error', 'Error updating doctor', 'error');
      }
    );
  }
}
