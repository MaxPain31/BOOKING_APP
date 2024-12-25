import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import { AuthService } from '../auth.service';
import { iAddress } from '../admin/admin.model';

@Component({
  selector: 'app-drop-off-location',
  templateUrl: './drop-off-location.page.html',
  styleUrls: ['./drop-off-location.page.scss'],
})
export class DropOffLocationPage implements OnInit {
  selectedDateTime: string = '';
  selectedDriver: string = '';
  selectedDriverEmail: string = '';
  recentBooks: string[] = [];
  savedAddresses: iAddress[] = [];
  loggedInUserEmail: string = '';

  query: string = '';
  places: any[] = [];
  addressList: iAddress[] = [];
  isLoading: boolean = false;
  pickUpLocation: any = null;
  dropOffLocation: any = null;
  isDropOffLocation: boolean = true;


  constructor(private router: Router, private authService: AuthService,) { }

  ngOnInit() {
    const state = history.state;
    this.selectedDateTime = state.selectedDateTime;
    this.selectedDriver = state.selectedDriver;
    this.pickUpLocation = state.pickUpLocation;
    this.selectedDriverEmail = state.selectedDriverEmail;

    this.loggedInUserEmail = localStorage.getItem('email') || '';

    this.fetchRecentBooks();
    this.fetchSavedAddresses();
  }

  async fetchRecentBooks() {
    const db = getFirestore();
    const booksRef = collection(db, 'completed-books');
    const q = query(booksRef, where('email', '==', this.loggedInUserEmail));

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
          place: addressData.address,
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

  confirm() {
    if (!this.query) {
        this.authService.presentAlert('Error', 'Please select a drop-off location.');
        return;
    }
    
    // Check if the selected drop-off address matches the pick-up address
    if (this.checkForPickupAddressMatch(this.addressList)) {
        // Stop execution if there's a match
        return;
    }
    
    // If no match, proceed with navigation
    this.router.navigate(['/ride-info'], {
        state: {
            selectedDateTime: this.selectedDateTime,
            selectedDriver: this.selectedDriver,
            selectedDriverEmail: this.selectedDriverEmail,
            pickUpLocation: this.pickUpLocation,
            dropOffLocation: this.addressList
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
          alert('Address saved successfully');
        } else {
          querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
            alert('Address removed successfully');
          });
        }
      }

    } catch (error) {
      console.error('Error saving or removing address:', error);
    }
  }

  choosePlace(place: any) {
    // Check if the selected drop-off address matches the pick-up address
    if (this.checkForPickupAddressMatch(place)) {
        // Stop execution if there's a match
        return;
    }
    
    this.addressList = place;
    this.query = place.address;
    this.places = [];
    console.log(this.query);
}

  checkForPickupAddressMatch(selectedAddress: any) {
    if (this.pickUpLocation && selectedAddress.address === this.pickUpLocation.place) {
        this.authService.presentToast('Error: This address is your pick-up location and cannot be selected as the drop-off location.');
        return true; 
    }
    return false; 
}

}