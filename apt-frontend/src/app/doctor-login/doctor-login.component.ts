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
    this.authService.loginDoctorUser(this.username, this.password).subscribe(
      (response: any) => {
        console.log('Login response:', response); // Debugging line to log the response

        if (response && response.token && response.doctorId) {
          // Save token and doctor ID in localStorage
          localStorage.setItem('jwtToken', response.token);
          localStorage.setItem('doctorId', response.doctorId);
          console.log('Token and doctorId set in localStorage');
    
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
        } else {
          // Handle missing token or doctorId in response
          console.error('Missing token or doctorId in response', response);
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid login response. Please try again.'
          });
        }
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
      this.isAdminLogin = true;
      this.router.navigate(['/login/superuser']);
    }
  }
}
