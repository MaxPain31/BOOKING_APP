import { Component, OnInit } from '@angular/core';
import { Contact, iContact } from './emergency.model';
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
  selector: 'app-emergency',
  templateUrl: './emergency.page.html',
  styleUrls: ['./emergency.page.scss'],
})
export class EmergencyPage {

  contacts: Contact = new Contact();
  contactList: iContact[] = [];
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router, private loadController: LoadingController) { }

  ionViewWillEnter() {
    this.fetchContacts();
  }

  //admin-new page

  async fetchContacts() {
    try {
      this.isLoading = true;
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'contacts'));
      this.contactList = [];
      querySnapshot.forEach((doc) => {
        const contactData = doc.data();
        const contact: iContact = {
          id: doc.id,
          name: contactData['name'],
          contactNum: contactData['contactNum']
        };
        this.contactList.push(contact);
      });
      console.log('Fetched contacts:', this.contactList); // Log fetched contacts
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      this.isLoading = false;
    }
  }
  

  add() {
    this.router.navigate(['contact']);
  }

  update(contact: Contact) {
    this.router.navigate(['emergency-update']);
    this.authService.newContactList = this.contactList;
    this.edit(contact);
    console.log(this.contactList);
  }

  edit(contact: iContact) {
    this.contacts = contact;
  }

  async contact() {
    this.isLoading = true;
    this.contactList = await this.authService.getContact();
    this.authService.newContactList = this.contactList;
    this.isLoading = false;
  }

  async delete(contact: Contact) {
    const confirmed = window.confirm('Are you sure you want to remove this contact?');
    
    if (confirmed) {
        this.isLoading = true;
        await this.authService.tryDeleteContact(contact);
        this.authService.presentAlert('Delete', 'Contact Deleted');
        await this.fetchContacts();
        this.contacts = new Contact();
        this.isLoading = false;
    } else {
      return;
    }
  }



}

