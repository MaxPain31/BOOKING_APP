import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverAccountPageRoutingModule } from './driver-account-routing.module';

import { DriverAccountPage } from './driver-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverAccountPageRoutingModule
  ],
  declarations: [DriverAccountPage]
})
export class DriverAccountPageModule {}
