import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KemaskiniLaporanPageRoutingModule } from './kemaskini-laporan-routing.module';

import { KemaskiniLaporanPage } from './kemaskini-laporan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KemaskiniLaporanPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [KemaskiniLaporanPage]
})
export class KemaskiniLaporanPageModule {}
