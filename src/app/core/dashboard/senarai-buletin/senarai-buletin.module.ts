import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SenaraiBuletinPageRoutingModule } from './senarai-buletin-routing.module';

import { SenaraiBuletinPage } from './senarai-buletin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SenaraiBuletinPageRoutingModule
  ],
  declarations: [SenaraiBuletinPage]
})
export class SenaraiBuletinPageModule {}
