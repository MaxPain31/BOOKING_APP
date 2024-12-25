import { Component, OnInit } from '@angular/core';
import { Address } from '../admin/admin.model';
import { iAddress } from '../admin/admin.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  addresses: Address = new Address();
  addressList: iAddress[] = [];
  id: any;
  constructor(private route: ActivatedRoute, private authService: AuthService, private loadController: LoadingController, private router: Router) { }

  ngOnInit() {
  }

  //create-new page
  async addAddress() {
    if (this.validateAddress()) {
      let loader = await this.loadController.create({
        message: "Please wait..."
      });
      await loader.present();
      if (!this.addresses.id) {
        this.authService.tryAdd(this.addresses);
        this.authService.presentAlert('SUCCESS', 'ADDRESS ADDED.')
      }
      this.addresses = new Address();
      await loader.dismiss();
      this.router.navigate(['admin']);
    }
  }

  validateAddress() {
    if (!this.addresses.title || !this.addresses.place) {
      this.authService.presentAlert('Sorry', 'Please fill all blank');
      return false;
    }
      return true;
  }

}

