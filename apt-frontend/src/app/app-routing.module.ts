import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BookAptComponent } from './book-apt/book-apt.component';
import { ContactComponent } from './contact/contact.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { AdminDboardComponent } from './admin-dboard/admin-dboard.component';

import { AuthGuard } from './auth.guard';



const routes: Routes = [
  { path: 'admin-login', component: AdminLoginComponent, canActivate: [AuthGuard] },
  { path: 'homepage', component: HomepageComponent },
  { path: 'book-apt', component: BookAptComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'doctor-login', component: DoctorLoginComponent, canActivate: [AuthGuard] },
  { path: 'admin-dboard', component: AdminDboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
