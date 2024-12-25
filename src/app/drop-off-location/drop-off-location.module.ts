import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DropOffLocationPageRoutingModule } from './drop-off-location-routing.module';

import { DropOffLocationPage } from './drop-off-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DropOffLocationPageRoutingModule
  ],
  declarations: [DropOffLocationPage]
})
export class DropOffLocationPageModule {}
