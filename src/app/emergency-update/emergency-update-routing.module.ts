import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmergencyUpdatePage } from './emergency-update.page';

const routes: Routes = [
  {
    path: '',
    component: EmergencyUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmergencyUpdatePageRoutingModule {}
