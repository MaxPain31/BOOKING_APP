import { Component, OnInit } from '@angular/core';
import { Address } from '../admin/admin.model';
import { iAddress } from '../admin/admin.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  addresses: Address = new Address();
  addressList: iAddress[] = [];
  id: any;
  constructor(private route: ActivatedRoute, private authService: AuthService, private loadController: LoadingController, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.synch(this.authService.newAddressList);
  }
  //update-new page
  async updateAddress() {
    if (this.validate()) {
      let loader = await this.loadController.create({
        message: "Please wait..."
      });
      await loader.present();
      if (this.addresses.id) {
        this.authService.tryUpdate(this.addresses);
        this.authService.presentAlert('SUCCESS', ' ADDRESS UPDATED.')
      }
      this.addresses = new Address();
      await loader.dismiss();
      this.router.navigate(['admin']);
    }
  }

  validate() {
    if (!this.addresses.title || !this.addresses.place) {
      this.authService.presentAlert('Sorry', 'Please fill all blank');
      return false;
    }
      return true;
  }

 synch(address: iAddress[]) {
    address.forEach(place => {
      if (this.id == place.id) {
        this.addresses.id = place.id;
        this.addresses.title = place.title;
        this.addresses.place = place.place;
      }
    });
  }

}