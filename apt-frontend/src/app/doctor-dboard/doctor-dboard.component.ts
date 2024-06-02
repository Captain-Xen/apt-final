import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-dboard',
  templateUrl: './doctor-dboard.component.html',
  styleUrls: ['./doctor-dboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  doctorId: number | null = null; // Assuming doctor ID will be set from login/auth
  patients: any[] = [];
  appointments: any[] = [];
  selectedAppointment: any = null;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.doctorId = this.getLoggedInDoctorId(); // Get logged-in doctor's ID
    if (this.doctorId) {
      this.getPatientsByDoctor(this.doctorId);
      this.getAppointments();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to get doctor ID. Please log in again.'
      });
      this.router.navigate(['/login']); // Navigate to login if doctor ID is not found
    }
  }

  getLoggedInDoctorId(): number | null {
    // Replace this with actual logic to get the logged-in doctor's ID
    return parseInt(localStorage.getItem('doctorId') || '0', 10);
  }

  getPatientsByDoctor(doctorId: number): void {
    this.dataService.getPatientsByDoctor(doctorId.toString()).subscribe(
      (data: any) => {
        this.patients = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: `Error fetching patients for doctor ${doctorId}`,
          text: error.message
        });
      }
    );
  }

  getAppointments(): void {
    this.dataService.getAllAppointments().subscribe(
      (data: any) => {
        this.appointments = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error fetching appointments',
          text: error.message
        });
      }
    );
  }

  getAppointmentById(appointmentId: string): void {
    this.dataService.getAppointmentById(appointmentId).subscribe(
      (data: any) => {
        this.selectedAppointment = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error fetching appointment',
          text: error.message
        });
      }
    );
  }

  createEPrescription(): void {
    const prescriptionData = {
      patient_id: 'patientId',
      doctor_id: this.doctorId, // Use the logged-in doctor's ID
      prescription: 'Prescription details'
    };

    this.dataService.createEPrescription(prescriptionData).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'E-prescription created successfully',
          text: response.message
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error creating e-prescription',
          text: error.message
        });
      }
    );
  }

  updateEPrescription(prescriptionId: string): void {
    const updatedPrescription = 'Updated prescription details';

    this.dataService.updateEPrescription(prescriptionId, updatedPrescription).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'E-prescription updated successfully',
          text: response.message
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error updating e-prescription',
          text: error.message
        });
      }
    );
  }

  deleteEPrescription(prescriptionId: string): void {
    this.dataService.deleteEPrescription(prescriptionId).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'E-prescription deleted successfully',
          text: response.message
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error deleting e-prescription',
          text: error.message
        });
      }
    );
  }
}
