import { Component, OnInit } from '@angular/core';
import { Contact,iContact } from '../emergency/emergency.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-emergency-update',
  templateUrl: './emergency-update.page.html',
  styleUrls: ['./emergency-update.page.scss'],
})
export class EmergencyUpdatePage implements OnInit {
  contacts: Contact = new Contact();
  contactList: iContact[] = [];
  isLoading: boolean = false;
  id: any;
  constructor(private route: ActivatedRoute, private authService: AuthService, private loadController: LoadingController, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.synch(this.authService.newContactList);
  }
 
  async updateContact() {
    if (this.validate()) {
      let loader = await this.loadController.create({
        message: "Please wait..."
      });
      await loader.present();
      if (this.contacts.id) {
        this.authService.tryUpdateContact(this.contacts);
        this.authService.presentAlert('SUCCESS', ' CONTACT UPDATED.')
      }
      this.contacts = new Contact();
      await loader.dismiss();
      this.router.navigate(['emergency']);
    }
  }

  validate() {
    if (!this.contacts.name || !this.contacts.contactNum) {
      this.authService.presentAlert('Sorry', 'Please fill all blank');
      return false;
    }
      return true;
  }

  synch(contact: iContact[]) {
    contact.forEach(conta => {
      if (this.id == conta.id) {
        this.contacts.id = conta.id;
        this.contacts.name= conta.name;
        this.contacts.contactNum = conta.contactNum;
      }
    });
  }

 
}
