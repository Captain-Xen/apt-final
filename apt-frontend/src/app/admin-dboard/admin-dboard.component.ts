import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-dboard',
  templateUrl: './admin-dboard.component.html',
  styleUrls: ['./admin-dboard.component.css']
})
export class AdminDboardComponent implements OnInit {
  adminUsername: string = 'Admin'; // This should be dynamically set after login

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Fetch and set the admin username here
    this.adminUsername = this.authService.getAdminUsername();
  }

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
}
