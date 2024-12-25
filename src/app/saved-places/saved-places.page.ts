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
  selector: 'app-saved-places',
  templateUrl: './saved-places.page.html',
  styleUrls: ['./saved-places.page.scss'],
})
export class SavedPlacesPage implements OnInit {
  selectedDateTime: string = '';
  selectedDriver: string = '';
  dropOffLocation: string = '';
  recentBooks: string[] = [];
  savedAddresses: iAddress[] = [];
  loggedInUserEmail: string = '';
  selectedDriverEmail: string = '';

  query: string = '';
  places: any[] = [];
  addressList: iAddress[] = [];
  isLoading: boolean = false;
  isDropOffLocation: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  async fetchSavedAddresses() {
    const db = getFirestore();
    const addressesRef = collection(db, 'saved-addresses');
    const q = query(addressesRef, where('email', '==', this.loggedInUserEmail));
  
    try {
      const querySnapshot = await getDocs(q);
      this.savedAddresses = [];
      querySnapshot.forEach((doc) => {
        const addressData = doc.data()['place'];
        const address: iAddress = {
          id: doc.id,
          title: addressData.title,
          place: addressData.address
        };
        this.savedAddresses.push(address);
      });
    } catch (error) {
      console.error('Error fetching saved addresses:', error);
    }
  }

}
