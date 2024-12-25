import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Car } from '../car-type/car-type.model';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

@Component({
  selector: 'app-pre-book',
  templateUrl: './pre-book.page.html',
  styleUrls: ['./pre-book.page.scss'],
})
export class PreBookPage implements OnInit {
  selectedDateTime: string = new Date().toISOString().slice(0, 16);
  selectedDriver: string = '';
  selectedDriverEmail: string = '';
  availableDrivers: { username: string, userEmail: string }[] = [];
  car: Car = new Car();
  carOptions: string[] = ['Motorcycle', 'Sedan', 'SUV'];
  selectedCarType: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentCarType.subscribe(carType => {
      this.selectedCarType = carType[0];
      this.fetchAvailableDrivers();
    });
    this.fetchAvailableDrivers();
  }

  selectCarType() {
    this.authService.changeCarType([this.selectedCarType]);
  }

  async fetchAvailableDrivers() {
    const db = getFirestore();
    const usersRef = collection(db, 'users');
    console.log(this.selectedCarType);
    const q = query(usersRef, where('userType', '==', 'driver'), where('available', '==', true), where('carType', '==', this.selectedCarType ));

    try {
      const querySnapshot = await getDocs(q);
      this.availableDrivers = querySnapshot.docs.map(doc => ({
        username: doc.data()['username'],
        userEmail: doc.data()['email']
      }));
    } catch (error) {
      console.error('Error fetching available drivers:', error);
    }
  }

  confirm() {
    if (!this.isFormValid()) {
      this.authService.presentAlert('Error', 'Please fill out all the fields.');
      return;
    }

    const selectedDriverData = this.availableDrivers.find(driver => driver.username === this.selectedDriver);
    if (!selectedDriverData) {
      console.error('Selected driver data not found.');
      return;
    }
    this.selectedDriverEmail = selectedDriverData.userEmail;

    const currentDateTime = new Date();
    const selectedDateTimeObj = new Date(this.selectedDateTime);

    if (selectedDateTimeObj < currentDateTime) {
      this.authService.presentAlert('Error', 'Please select a date and time after the current date and time.');
      return;
    }

    this.navigateToPickUpLocation();
  }

  private navigateToPickUpLocation() {
    this.router.navigate(['/pick-up-location'], {
      state: {
        selectedDateTime: this.selectedDateTime,
        selectedDriver: this.selectedDriver,
        selectedDriverEmail: this.selectedDriverEmail
      }
    });
  }

  private isFormValid(): boolean {
    const formData = {
      time: this.selectedDateTime,
      driver: this.selectedDriver,
      pickupLocation: 'Some Location'
    };
  
    if (!formData.time || !formData.driver || !formData.pickupLocation) {
      return false;
    }
  
    return true;
  }
}

