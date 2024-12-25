import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  navigateToCarType() {
    this.router.navigate(['/car-type']);
  }

  navigateToPreBook() {
    this.router.navigate(['/pre-book']);
  }
  

  logout() {
    this.authService.logout();
  }
}
