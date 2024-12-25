import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteInfoPage } from './complete-info.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteInfoPageRoutingModule {}
