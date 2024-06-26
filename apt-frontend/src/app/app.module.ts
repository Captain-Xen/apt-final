import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactComponent } from './contact/contact.component';
import { BookAptComponent } from './book-apt/book-apt.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { AppointmentService } from './services/appointment.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './services/auth.service';
import { AdminDboardComponent } from './admin-dboard/admin-dboard.component';
import { ServicesOfferedComponent } from './services-offered/services-offered.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';
import { AboutComponent } from './about/about.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AdminRegisterDoctorComponent } from './admin-register-doctor/admin-register-doctor.component';
import { DoctorDashboardComponent } from './doctor-dboard/doctor-dboard.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';
import { CreateEPrescriptionComponent } from './create-eprescription/create-eprescription.component';
import { EprescriptionListComponent } from './eprescription-list/eprescription-list.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ContactComponent,
    BookAptComponent,
    AdminLoginComponent,
    DoctorLoginComponent,
    AdminDboardComponent,
    ServicesOfferedComponent,
    NotFoundComponent,
    ReviewsListComponent,
    AboutComponent,
    ReviewsComponent,
    AdminRegisterDoctorComponent,
    DoctorDashboardComponent,
    PatientsListComponent,
    DoctorListComponent,
    AppointmentListComponent,
    DoctorEditComponent,
    CreateEPrescriptionComponent,
    EprescriptionListComponent,
    PatientAddComponent,
    PatientEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthService, 
    AppointmentService, 
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
