import { Component, OnInit } from '@angular/core';
import { Car } from './car-type.model';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

@Component({
  selector: 'app-car-type',
  templateUrl: './car-type.page.html',
  styleUrls: ['./car-type.page.scss'],
})
export class CarTypePage implements OnInit {
  car: Car = new Car();
  carType: string[] = ['Motorcycle', 'Sedan', 'SUV'];
  availableDrivers: { username: string, userEmail: string }[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private loadController: LoadingController
  ) {}

  ngOnInit() {
    console.log(this.car.type);
  }

  async fetchAvailableDrivers() {
    const db = getFirestore();
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      where('userType', '==', 'driver'),
      where('available', '==', true),
      where('carType', '==', this.car.type)
    );

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

  async confirm() {
    if (!this.car.type) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Please select a car type',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    await this.fetchAvailableDrivers();

    if (this.availableDrivers.length === 0) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No available drivers for the selected car type',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const selectedDriver = this.availableDrivers[Math.floor(Math.random() * this.availableDrivers.length)];

    console.log(this.car.type);
    console.log(selectedDriver);

    this.router.navigate(['/pick-up-location'], {
      state: {
        selectedCarType: this.car.type,
        selectedDriver: selectedDriver.username,
        selectedDriverEmail: selectedDriver.userEmail
      }
    });
  }
}