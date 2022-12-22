import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KemaskiniBuletinPageRoutingModule } from './kemaskini-buletin-routing.module';

import { KemaskiniBuletinPage } from './kemaskini-buletin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KemaskiniBuletinPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [KemaskiniBuletinPage]
})
export class KemaskiniBuletinPageModule {}
