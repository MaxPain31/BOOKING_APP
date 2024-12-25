import { Component, OnInit } from '@angular/core';
import { Address } from '../admin/admin.model';
import { iAddress } from '../admin/admin.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import {
  doc,
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage {

  addresses: Address = new Address();
  addressList: iAddress[] = [];
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router, private loadController: LoadingController) { }

  ionViewWillEnter() {
    this.fetchAddresses();
  }

  //admin-new page

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


  add() {
    this.router.navigate(['create']);
  }

  update(address: Address) {
    this.router.navigate(['update', address.id]);
    this.authService.newAddressList = this.addressList;
    this.edit(address);
    console.log(this.addressList);
  }

  edit(address: iAddress) {
    this.addresses = address;
  }

  async address() {
    this.isLoading = true;
    this.addressList = await this.authService.getAddress();
    this.authService.newAddressList = this.addressList;
    this.isLoading = false;
  }

  async delete(address: Address) {
    const confirmed = window.confirm('Are you sure you want to delete this address?');
    
    if (confirmed) {
        this.isLoading = true;
        await this.authService.tryDelete(address);
        this.authService.presentAlert('Delete', 'Address Deleted');
        await this.fetchAddresses();
        this.addresses = new Address();
        this.isLoading = false;
    } else {
      return;
    }
  }



}
