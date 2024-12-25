import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentMatrixPageRoutingModule } from './payment-matrix-routing.module';

import { PaymentMatrixPage } from './payment-matrix.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentMatrixPageRoutingModule
  ],
  declarations: [PaymentMatrixPage]
})
export class PaymentMatrixPageModule {}
