import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectPaymentPageRoutingModule } from './select-payment-routing.module';

import { SelectPaymentPage } from './select-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectPaymentPageRoutingModule
  ],
  declarations: [SelectPaymentPage]
})
export class SelectPaymentPageModule {}
