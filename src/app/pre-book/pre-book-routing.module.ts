import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreBookPage } from './pre-book.page';

const routes: Routes = [
  {
    path: '',
    component: PreBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreBookPageRoutingModule {}
