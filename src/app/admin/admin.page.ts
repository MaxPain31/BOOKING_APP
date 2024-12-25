import { Component, OnInit } from '@angular/core';
import { Address } from '../admin/admin.model';
import { iAddress } from '../admin/admin.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import {
  doc,
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage{
  addresses: Address = new Address();
  addressList: iAddress[] = [];
  isLoading: boolean = false;
  userType: string = 'passenger';

  constructor(private authService: AuthService, private router: Router) { }

  signOut() {
    this.router.navigate(['login']);
    this.authService.setAuthentication(false);
  }

  manageAddress () {
    this.router.navigate(['address']);
  }

  seeDrivers () {
    this.router.navigate(['driver-info']);
  }

  seeUsers () {
    this.router.navigate(['users']);
  }
}
