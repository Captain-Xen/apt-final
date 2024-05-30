import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-doctor-dboard',
  templateUrl: './doctor-dboard.component.html',
  styleUrls: ['./doctor-dboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  doctorId: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  patients: any[] = [];
  appointments: any[] = [];
  selectedAppointment: any = null;

  constructor(@Inject(DataService) private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.doctorId.forEach((doctorId) => {
      this.getPatientsByDoctor(doctorId);
    });
    this.getAppointments();
  }

  getPatientsByDoctor(doctorId: number): void {
    this.dataService.getPatientsByDoctor(doctorId.toString()).subscribe(
      (data: any) => {
        this.patients.push({ doctorId, data });
      },
      (error) => {
        console.error(`Error fetching patients for doctor ${doctorId}:`, error);
      }
    );
  }

  getAppointments(): void {
    this.dataService.getAllAppointments().subscribe(
      (data: any) => {
        this.appointments = data;
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  getAppointmentById(appointmentId: string): void {
    this.dataService.getAppointmentById(appointmentId).subscribe(
      (data: any) => {
        this.selectedAppointment = data;
      },
      (error) => {
        console.error('Error fetching appointment:', error);
      }
    );
  }

  createEPrescription(): void {
    const prescriptionData = {
      patient_id: 'patientId',
      doctor_id: 'doctorId',
      prescription: 'Prescription details'
    };

    this.dataService.createEPrescription(prescriptionData).subscribe(
      (response: any) => {
        console.log('E-prescription created successfully:', response);
        // Optionally, update the list of e-prescriptions after creation
      },
      (error) => {
        console.error('Error creating e-prescription:', error);
      }
    );
  }

  updateEPrescription(prescriptionId: string): void {
    const updatedPrescription = 'Updated prescription details';

    this.dataService.updateEPrescription(prescriptionId, updatedPrescription).subscribe(
      (response: any) => {
        console.log('E-prescription updated successfully:', response);
        // Optionally, update the list of e-prescriptions after updating
      },
      (error) => {
        console.error('Error updating e-prescription:', error);
      }
    );
  }

  deleteEPrescription(prescriptionId: string): void {
    this.dataService.deleteEPrescription(prescriptionId).subscribe(
      (response: any) => {
        console.log('E-prescription deleted successfully:', response);
        // Optionally, update the list of e-prescriptions after deletion
      },
      (error) => {
        console.error('Error deleting e-prescription:', error);
      }
    );
  }
}