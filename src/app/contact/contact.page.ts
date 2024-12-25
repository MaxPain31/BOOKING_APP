import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';
import { Contact, iContact } from '../emergency/emergency.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  contacts: Contact = new Contact();
  contactList: iContact[] = [];
  id: any;
  constructor(private route: ActivatedRoute, private authService: AuthService, private loadController: LoadingController, private router: Router) { }

  ngOnInit() {
  }

  //create-new page
  async addContact() {
    if (this.validateContacts()) {
      const contacts = await this.authService.getContact();
        
        // Check if the number of contacts exceeds 3
        if (contacts.length >= 3) {
            this.authService.presentAlert('Error', 'You can only add up to 3 contacts.');
            return; // Exit the method if the limit is reached
    }
      let loader = await this.loadController.create({
        message: "Please wait..."
      });
      await loader.present();
      if (!this.contacts.id) {
        this.authService.tryAddContact(this.contacts);
        this.authService.presentAlert('SUCCESS', 'CONTACT ADDED.')
      }
      this.contacts = new Contact();
      await loader.dismiss();
      this.router.navigate(['emergency']);
    }
  }

  validateContacts() {
    if (!this.contacts.name || !this.contacts.contactNum) {
      this.authService.presentAlert('Sorry', 'Please fill all blank');
      return false;
    }
      return true;
  }

}
