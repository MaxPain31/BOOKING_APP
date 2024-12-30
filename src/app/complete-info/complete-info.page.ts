import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { iAddress } from '../admin/admin.model';

@Component({
  selector: 'app-complete-info',
  templateUrl: 'complete-info.page.html',
  styleUrls: ['complete-info.page.scss'],
})
export class CompleteInfoPage {
  selectedDateTime: string = '';
  selectedDriver: string = '';
  selectedDriverEmail: string = '';
  selectedCarType: string | null = null;
  pickUpLocation: any;
  dropOffLocation: any;
  username: string = '';
  usernumber: string = '';
  drivername: string = '';
  drivernumber: string = '';
  loggedInUserEmail: string = '';
  addressList: iAddress[] = [];
  selectedPaymentMethod: string = '';
  isLoading: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const state = history.state;
    this.selectedDateTime = state.selectedDateTime;
    this.selectedDriver = state.selectedDriver;
    this.selectedDriverEmail = state.selectedDriverEmail;
    this.pickUpLocation = state.pickUpLocation;
    this.dropOffLocation = state.dropOffLocation;
    this.selectedCarType = state.selectedCarType;
    this.selectedPaymentMethod = state.selectedPaymentMethod;

    this.loggedInUserEmail = localStorage.getItem('email') || '';
    this.fetchUserInfo(this.loggedInUserEmail);
    console.log(this.selectedDriverEmail);
    this.fetchDriverInfo(this.selectedDriverEmail);
    console.log(this.selectedDriverEmail);
  }

  async fetchUserInfo(loggedInUserEmail: string | null) {
    if (!loggedInUserEmail) return;

    const db = getFirestore();
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', loggedInUserEmail));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userInfo = querySnapshot.docs[0].data();
        this.username = userInfo['username'];
        this.usernumber = userInfo['phNo'];
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }

  async fetchDriverInfo(driverEmail: string) {
    const db = getFirestore();
    const driversRef = collection(db, 'users');
    const q = query(driversRef, where('email', '==', driverEmail));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const driverInfo = querySnapshot.docs[0].data();
        this.drivername = driverInfo['username'];
        this.selectedDriverEmail = driverInfo['email'];
        this.drivernumber = driverInfo['phNo'];
      }
    } catch (error) {
      console.error('Error fetching driver info:', error);
    }
  }

  async fetchAddresses() {
    try {
      this.isLoading = true;
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'address'));
      this.addressList = [];
      querySnapshot.forEach((doc) => {
        const addressData = doc.data();
        const address: iAddress = {
          id: doc.id,
          title: addressData['title'],
          place: addressData['place'],
        };
        this.addressList.push(address);
      });
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      this.isLoading = false;
    }
  }


  navigateToSelectPayment() {
    this.router.navigate(['select-payment'], {
      state: {
        selectedDateTime: this.selectedDateTime,
        selectedDriver: this.selectedDriver,
        selectedDriverEmail: this.selectedDriverEmail,
        pickUpLocation: this.pickUpLocation,
        dropOffLocation: this.dropOffLocation,
        selectedCarType: this.selectedCarType,
      },
    });
  }
}
