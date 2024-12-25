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
  selector: 'app-pick-up-location',
  templateUrl: './pick-up-location.page.html',
  styleUrls: ['./pick-up-location.page.scss'],
})
export class PickUpLocationPage implements OnInit {
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


  constructor(private router: Router, private authService: AuthService,) { }

  ngOnInit() {
    const state = history.state;
    this.selectedDateTime = state.selectedDateTime;
    this.selectedDriver = state.selectedDriver;
    this.selectedDriverEmail = state.selectedDriverEmail;

    this.loggedInUserEmail = localStorage.getItem('email') || '';

    this.fetchRecentBooks();
    this.fetchSavedAddresses();

    this.query = '';
    this.places = [];
  }

  

  async fetchRecentBooks() {
    const db = getFirestore();
    const booksRef = collection(db, 'completed-books');
    const q = query(booksRef, where('user-email', '==', this.loggedInUserEmail));

    try {
      const querySnapshot = await getDocs(q);
      this.recentBooks = querySnapshot.docs.map(doc => doc.data()['address']);
    } catch (error) {
      console.error('Error fetching recent books:', error);
    }
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

  selectAddress(address: { title: string, address: string }) {
    const isBookmarked = this.isBookmarked(address);
    this.saveAddress(address, true);
  }

  isBookmarked(place: { title: string, address: string }): boolean {
    return this.savedAddresses.some(savedAddress => savedAddress.place === place.address);
  }  
  
  async saveAddress(place: { title: string, address: string }, toggle: boolean) {
    try {
      const db = getFirestore();
      const addressesRef = collection(db, 'saved-addresses');
      const querySnapshot = await getDocs(query(addressesRef, where('place.address', '==', place.address)));
  
      if (toggle) {
        if (querySnapshot.empty) {
          await addDoc(addressesRef, {
            place,
            email: this.loggedInUserEmail
          });
          this.authService.presentToast('Address saved successfully');
        } else {
          querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
            this.authService.presentToast('Address removed successfully');
          });
        }
      }

    } catch (error) {
      console.error('Error saving or removing address:', error);
    }
  }

  confirm() {
    if (!this.query) {
      this.authService.presentAlert('Error', 'Please select a pick-up location.');
      return;
    }

    this.router.navigate(['/drop-off-location'], {
      state: {
        selectedDateTime: this.selectedDateTime,
        selectedDriver: this.selectedDriver,
        pickUpLocation: this.addressList,
        dropOffLocation: this.dropOffLocation,
        selectedDriverEmail: this.selectedDriverEmail
      }
    });
  }

  async searchAddress() {
    if (this.query === '') {
      this.places = [];
      return;
    }
  
    if (!this.places || this.places.length == 0) {
      await this.fetchAddresses();
      console.log(this.query)
      console.log(this.places)
    }
  
    try {
      const autoCompleteItems = this.addressList.filter(address =>
        address.place.toLowerCase().includes(this.query.toLowerCase()) ||
        address.title.toLowerCase().includes(this.query.toLowerCase())
      ).map(address => ({
        title: address.title,
        address: address.place
      }));
  
      this.places = autoCompleteItems;
      console.log(this.places);
    } catch (error) {
      console.error(error);
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

  choosePlace(place: any) {
    this.addressList = place;
    this.query = place.address;
    this.places = [];
    console.log(this.query);
  }
}