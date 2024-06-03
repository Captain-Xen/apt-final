import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BookAptComponent } from './book-apt/book-apt.component';
import { ContactComponent } from './contact/contact.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { AdminDboardComponent } from './admin-dboard/admin-dboard.component';
import { ServicesOfferedComponent } from './services-offered/services-offered.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AdminRegisterDoctorComponent } from './admin-register-doctor/admin-register-doctor.component';
import { DoctorDashboardComponent } from './doctor-dboard/doctor-dboard.component';
import { AuthGuard } from './auth.guard';
import { PatientsListComponent } from './patients-list/patients-list.component'; 
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: 'admin/register-doctor', component: AdminRegisterDoctorComponent, canActivate: [AuthGuard] },
  { path: 'patients', component: PatientsListComponent, canActivate: [AuthGuard] },
  { path: 'doctor-list', component: DoctorListComponent, canActivate: [AuthGuard] },
  { path: 'appointments', component: AppointmentListComponent, canActivate: [AuthGuard] },
  { path: 'login/superuser', component: AdminLoginComponent }, 
  { path: '', component: HomepageComponent },
  { path: 'book-apt', component: BookAptComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'doctor-login', component: DoctorLoginComponent }, // No AuthGuard here
  { path: 'admin-dboard', component: AdminDboardComponent, canActivate: [AuthGuard] },
  { path: 'doctor-dboard', component: DoctorDashboardComponent, canActivate: [AuthGuard] },
  { path: 'services-offered', component: ServicesOfferedComponent },

  // wild card: for nonexistent routes -> 404 Page. 
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
