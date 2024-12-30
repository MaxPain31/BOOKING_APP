import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { iAddress, Address } from '../admin/admin.model';
import {
  doc,
  getDoc,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';

@Component({
  selector: 'app-select-payment',
  templateUrl: './select-payment.page.html',
  styleUrls: ['./select-payment.page.scss'],
})
export class SelectPaymentPage implements OnInit {
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

  accountName: string = '';
  accountPhoneNumber: string = '';
  currentUserUid: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadPaymentInformation();
    const state = history.state;
    this.selectedDateTime = state.selectedDateTime || '';
    this.selectedDriver = state.selectedDriver || '';
    this.selectedDriverEmail = state.selectedDriverEmail || '';
    this.pickUpLocation = state.pickUpLocation || null;
    this.dropOffLocation = state.dropOffLocation || null;
    this.selectedCarType = state.selectedCarType || 'Unknown'; // Default if not provided
    console.log('State:', history.state);

    this.loggedInUserEmail = localStorage.getItem('email') || '';
    this.fetchUserInfo(this.loggedInUserEmail);
    console.log(this.selectedDriverEmail);
    this.fetchDriverInfo(this.selectedDriverEmail);
    console.log(this.selectedDriverEmail);
  }

  async loadPaymentInformation() {
    const user = this.authService.getUser();
    if (user) {
      this.currentUserUid = user.uid;

      const firestore = getFirestore();
      const docRef = doc(firestore, 'paymentMethods', this.currentUserUid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const paymentData = docSnap.data();
        this.selectedPaymentMethod = paymentData['paymentMethod'];
        if (this.selectedPaymentMethod === 'GCash') {
          this.accountName = paymentData['accountName'];
          this.accountPhoneNumber = paymentData['accountPhoneNumber'];
        }
      }
    }
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

  async confirmBooking() {
    const db = getFirestore();
    const bookingsRef = collection(db, 'books');
    const usersRef = collection(db, 'users');
    const user = this.authService.getUser();

    try {
      const bookingData: any = {
        uid: user.uid,
        email: this.selectedDriverEmail,
        username: this.drivername,
        phNo: this.drivernumber,
        dropOffLocation: this.dropOffLocation ? this.dropOffLocation : null,
        pickUpLocation: this.pickUpLocation ? this.pickUpLocation : null,
        paymentMethod: this.selectedPaymentMethod,
        'time-date': this.selectedDateTime,
      };

      if (this.selectedPaymentMethod === 'GCash') {
        bookingData['accountName'] = this.accountName;
        bookingData['accountPhoneNumber'] = this.accountPhoneNumber;
      }

      await addDoc(bookingsRef, bookingData);
      console.log('Booking information saved to Firestore');

      const q = query(usersRef, where('email', '==', this.selectedDriverEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const driverDocRef = querySnapshot.docs[0].ref;
        await updateDoc(driverDocRef, { available: false });
        console.log('Driver availability updated successfully');
      } else {
        console.error(
          'Driver document not found for email:',
          this.selectedDriverEmail
        );
      }
    } catch (error) {
      console.error('Error saving booking information:', error);
    }

    this.router.navigate(['tabs/activity']);
  }
}
