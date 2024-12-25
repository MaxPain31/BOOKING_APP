import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
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
          phone: this.phNo,
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
}