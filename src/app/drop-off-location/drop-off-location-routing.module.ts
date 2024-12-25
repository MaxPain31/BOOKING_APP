import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DropOffLocationPage } from './drop-off-location.page';

const routes: Routes = [
  {
    path: '',
    component: DropOffLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DropOffLocationPageRoutingModule {}
