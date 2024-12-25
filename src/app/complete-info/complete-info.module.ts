import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteInfoPageRoutingModule } from './complete-info-routing.module';

import { CompleteInfoPage } from './complete-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteInfoPageRoutingModule
  ],
  declarations: [CompleteInfoPage]
})
export class CompleteInfoPageModule {}
