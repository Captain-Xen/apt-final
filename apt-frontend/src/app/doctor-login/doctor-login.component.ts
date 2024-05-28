import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent {
  username: string = '';
  password: string = '';
  isAdminLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.loginDoctor(this.username, this.password).subscribe(
      (response: any) => {
        // Save the token in localStorage
        localStorage.setItem('token', response.token);

        // Display success alert
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You have been successfully logged in!',
          showConfirmButton: false,
          timer: 1500
        });

        // Redirect to the doctor's dashboard w/ delay of 1.5s
        setTimeout(() => {
          this.router.navigate(['/doctor-dboard']);
        }, 1500);
      },
      (error: any) => {
        // error alert
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.error.message || 'Unable to login. Please check your credentials and try again.'
        });
      }
    );
  }

  selectLogin(type: string): void {
    if (type === 'admin') {
      this.router.navigate(['/login/superuser']);
    }
  }
}
