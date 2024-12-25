import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.page.html',
  styleUrls: ['./user-account.page.scss'],
})
export class UserAccountPage implements OnInit {
  user: any = {};
  isEditing: boolean = false;
  email: string = '';
  username: string = '';
  phNo: string = '';
  carType: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.fetchUserDetails();
  }

  async fetchUserDetails() {
    const app = initializeApp(environment.firebaseConfig);
    const db = getFirestore(app);
    const emailFromLocalStorage = localStorage.getItem('email');

    if (emailFromLocalStorage) {
      const q = query(collection(db, 'users'), where('email', '==', emailFromLocalStorage));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        this.user = userData;
        this.email = userData['email'];
        this.username = userData['username'];
        this.phNo = userData['phNo'];
        this.carType = userData['carType'];
      } else {
        console.error('No user found in Firestore for the provided email');
      }
    } else {
      console.error('No email found in local storage');
    }
  }

  navigateToEdit() {
    this.router.navigate(['edit-user']);
  }

  navigateToPaymentMatrix() {
    this.router.navigate(['payment-matrix']);
  }

  navigateToSavedPlaces() {
    this.router.navigate(['saved-places']);
  }

  navigateToEmergencyMethod() {
    this.router.navigate(['emergency']);
  }

  signOut() {
    this.router.navigate(['login']);
    this.authService.setAuthentication(false);
  }
}
