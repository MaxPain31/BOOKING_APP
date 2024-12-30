import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectPaymentPage } from './select-payment.page';

const routes: Routes = [
  {
    path: '',
    component: SelectPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectPaymentPageRoutingModule {}
