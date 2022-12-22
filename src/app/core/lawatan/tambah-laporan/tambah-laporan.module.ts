import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TambahLaporanPageRoutingModule } from './tambah-laporan-routing.module';

import { TambahLaporanPage } from './tambah-laporan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TambahLaporanPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TambahLaporanPage]
})
export class TambahLaporanPageModule {}
