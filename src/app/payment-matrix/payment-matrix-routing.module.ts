import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentMatrixPage } from './payment-matrix.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentMatrixPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentMatrixPageRoutingModule {}
