import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedPlacesPageRoutingModule } from './saved-places-routing.module';

import { SavedPlacesPage } from './saved-places.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedPlacesPageRoutingModule
  ],
  declarations: [SavedPlacesPage]
})
export class SavedPlacesPageModule {}
