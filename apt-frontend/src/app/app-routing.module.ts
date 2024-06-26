import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BookAptComponent } from './book-apt/book-apt.component';
import { ContactComponent } from './contact/contact.component';
import { CreateEPrescriptionComponent } from './create-eprescription/create-eprescription.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorDashboardComponent } from './doctor-dboard/doctor-dboard.component';
import { EprescriptionListComponent } from './eprescription-list/eprescription-list.component';
import { AdminDboardComponent } from './admin-dboard/admin-dboard.component';
import { ServicesOfferedComponent } from './services-offered/services-offered.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AdminRegisterDoctorComponent } from './admin-register-doctor/admin-register-doctor.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
// services
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: 'admin/register-doctor', component: AdminRegisterDoctorComponent, canActivate: [AuthGuard] },
  { path: 'patients', component: PatientsListComponent, canActivate: [AuthGuard] },
  { path: 'edit-doctor/:id', component: DoctorEditComponent, canActivate: [AuthGuard] },
  { path: 'doctor-list', component: DoctorListComponent, canActivate: [AuthGuard] },
  { path: 'doctor-dboard', component: DoctorDashboardComponent, canActivate: [AuthGuard] },
  { path: 'appointments', component: AppointmentListComponent, canActivate: [AuthGuard] },
  { path: 'create-eprescription/:patientId', component: CreateEPrescriptionComponent, canActivate: [AuthGuard] },
  { path: 'e-prescriptions', component: EprescriptionListComponent, canActivate: [AuthGuard] },
  { path: 'admin-dboard', component: AdminDboardComponent, canActivate: [AuthGuard] },
  { path: 'add-patient', component: PatientAddComponent, canActivate: [AuthGuard] },
  { path: 'edit-patient/:id', component: PatientEditComponent, canActivate: [AuthGuard] },
  { path: 'doctor-login', component: DoctorLoginComponent },
  { path: 'login/superuser', component: AdminLoginComponent }, 
  { path: '', component: HomepageComponent },
  { path: 'book-apt', component: BookAptComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'services-offered', component: ServicesOfferedComponent },

  // wild card: for nonexistent routes -> 404 Page. 
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
