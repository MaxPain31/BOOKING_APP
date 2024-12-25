import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreBookPageRoutingModule } from './pre-book-routing.module';

import { PreBookPage } from './pre-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreBookPageRoutingModule
  ],
  declarations: [PreBookPage]
})
export class PreBookPageModule {}
