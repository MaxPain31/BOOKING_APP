import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverAccountPage } from './driver-account.page';

const routes: Routes = [
  {
    path: '',
    component: DriverAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverAccountPageRoutingModule {}
