import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged, 
  User
} from 'firebase/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.page.html',
  styleUrls: ['./driver-info.page.scss'],
})
export class DriverInfoPage implements OnInit {
  drivers: any[] = [];
  isLoading: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.fetchDrivers();
  }

  async fetchDrivers() {
    const app = initializeApp(environment.firebaseConfig);
    const db = getFirestore(app);
  
    try {
      const q = query(collection(db, 'users'), where('userType', '==', 'driver'));
      const querySnapshot = await getDocs(q);
      const fetchedDrivers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        carType: doc.data()['carType'],
        available: doc.data()['available'],
        phNo: doc.data()['phNo'],
        email: doc.data()['email'],
        username: doc.data()['username'],
        approved: doc.data()['approved'], // Fetch the approval status
      }));
      this.drivers = fetchedDrivers;
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  }

  async updateDriverApproval(driverId: string, approvalStatus: boolean) {
    const app = initializeApp(environment.firebaseConfig);
    const db = getFirestore(app);
    const driverRef = doc(db, 'users', driverId);
  
    try {
      await updateDoc(driverRef, { approved: approvalStatus });
      this.fetchDrivers(); // Refresh the driver list after update
    } catch (error) {
      console.error('Error updating driver approval:', error);
    }
  }
  
  approveDriver(driverId: string) {
    this.updateDriverApproval(driverId, true);
  }
  
  disapproveDriver(driverId: string) {
    this.updateDriverApproval(driverId, false);
  }
  

}
