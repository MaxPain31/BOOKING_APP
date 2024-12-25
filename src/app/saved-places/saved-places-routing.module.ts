import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedPlacesPage } from './saved-places.page';

const routes: Routes = [
  {
    path: '',
    component: SavedPlacesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedPlacesPageRoutingModule {}
