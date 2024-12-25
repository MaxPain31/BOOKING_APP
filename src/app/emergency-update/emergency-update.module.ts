import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmergencyUpdatePageRoutingModule } from './emergency-update-routing.module';

import { EmergencyUpdatePage } from './emergency-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmergencyUpdatePageRoutingModule
  ],
  declarations: [EmergencyUpdatePage]
})
export class EmergencyUpdatePageModule {}
