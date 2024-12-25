import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { iAddress, Address } from '../admin/admin.model';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';

@Component({
  selector: 'app-ride-info',
  templateUrl: './ride-info.page.html',
  styleUrls: ['./ride-info.page.scss'],
})
export class RideInfoPage implements OnInit {
  selectedDateTime: string = '';
  selectedDriver: string = '';
  selectedDriverEmail: string = '';
  pickUpLocation: any;
  dropOffLocation: any;
  addressList: iAddress[] = [];
  carType: string[] = [];
  isLoading: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    const state = history.state;
    this.selectedDateTime = state.selectedDateTime;
    this.selectedDriver = state.selectedDriver;
    this.selectedDriverEmail = state.selectedDriverEmail;
    this.pickUpLocation = state.pickUpLocation;
    this.dropOffLocation = state.dropOffLocation;
    this.authService.currentCarType.subscribe(type => this.carType = type);
    
  }

  navigateToCompleteInfo() {
    this.router.navigate(['complete-info'], {
      state: {
        selectedDateTime: this.selectedDateTime,
        selectedDriver: this.selectedDriver,
        selectedDriverEmail: this.selectedDriverEmail,
        pickUpLocation: this.pickUpLocation,
        dropOffLocation: this.dropOffLocation
      }
    });
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
          place: addressData['place']
        };
        this.addressList.push(address);
      });
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
