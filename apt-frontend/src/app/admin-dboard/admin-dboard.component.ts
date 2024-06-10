import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-dboard',
  templateUrl: './admin-dboard.component.html',
  styleUrls: ['./admin-dboard.component.css']
})
export class AdminDboardComponent implements OnInit {
  adminUsername: string = 'Admin'; 

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    
    const username = this.authService.getAdminUsername();
    this.adminUsername = username ? username : 'Default Admin'; 
  }

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }

  logout(): void {
    this.authService.logout();
    Swal.fire('Logged out', 'You have been logged out successfully', 'success').then(() => {
      this.router.navigate(['/login/superuser']); 
    });
  }
}
