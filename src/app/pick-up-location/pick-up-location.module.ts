import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickUpLocationPageRoutingModule } from './pick-up-location-routing.module';

import { PickUpLocationPage } from './pick-up-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickUpLocationPageRoutingModule
  ],
  declarations: [PickUpLocationPage]
})
export class PickUpLocationPageModule {}
