import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  userType: string = '';
  
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}
