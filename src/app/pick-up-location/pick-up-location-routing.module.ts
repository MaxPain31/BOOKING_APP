import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickUpLocationPage } from './pick-up-location.page';

const routes: Routes = [
  {
    path: '',
    component: PickUpLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickUpLocationPageRoutingModule {}
