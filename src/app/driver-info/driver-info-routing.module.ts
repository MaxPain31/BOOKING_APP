import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverInfoPage } from './driver-info.page';

const routes: Routes = [
  {
    path: '',
    component: DriverInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverInfoPageRoutingModule {}
