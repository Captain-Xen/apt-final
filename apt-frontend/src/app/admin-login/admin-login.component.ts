import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.username && this.password) {
      this.authService.loginAdmin(this.username, this.password).subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          Swal.fire('Success', 'Login successful!', 'success');
          this.router.navigate(['/admin-dboard']);
        },
        (error) => {
          Swal.fire('Error', 'Login failed. Please try again.', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Please enter username and password.', 'error');
    }
  }
}
