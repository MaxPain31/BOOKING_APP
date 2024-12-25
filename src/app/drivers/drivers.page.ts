import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc, getDoc} from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.page.html',
  styleUrls: ['./drivers.page.scss'],
})
export class DriversPage implements OnInit {
  user: any = {};
  isEditing: boolean = false;
  email: string = '';
  username: string = '';
  phNo: string = '';
  carType: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.fetchUserDetails();
    this.checkApprovalStatus();
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

  enableEditing() {
    this.isEditing = true;
  }

  async saveUserDetails() {
    const app = initializeApp(environment.firebaseConfig);
    const db = getFirestore(app);
    const emailFromLocalStorage = localStorage.getItem('email');
  
    if (emailFromLocalStorage) {
      const q = query(collection(db, 'users'), where('email', '==', emailFromLocalStorage));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].ref;
        await updateDoc(userDoc, {
          email: this.email,
          username: this.username,
          phNo: this.phNo,
          carType: this.carType
        });
        this.isEditing = false;
        this.fetchUserDetails();
      } else {
        console.error('No user found in Firestore for the provided email');
      }
    } else {
      console.error('No email found in local storage');
    }
  }

  signOut() {
    this.router.navigate(['login']);
    this.authService.setAuthentication(false);
  }

  
  async checkApprovalStatus() {
    const app = initializeApp(environment.firebaseConfig);
    const db = getFirestore(app);
    const user = this.authService.getUser();
    const userRef = doc(db, 'users', user.uid);
  
    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (!userData['approved']) {
          alert('Your account is not verified yet. Please wait for admin approval.');
        }
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error checking approval status:', error);
    }
  }
  
}
