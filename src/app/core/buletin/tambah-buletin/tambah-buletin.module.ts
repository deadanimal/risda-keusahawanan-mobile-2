import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TambahBuletinPageRoutingModule } from './tambah-buletin-routing.module';

import { TambahBuletinPage } from './tambah-buletin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TambahBuletinPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TambahBuletinPage]
})
export class TambahBuletinPageModule {}
