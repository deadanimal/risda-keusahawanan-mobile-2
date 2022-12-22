import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KatalogPegawaiPageRoutingModule } from './katalog-pegawai-routing.module';

import { KatalogPegawaiPage } from './katalog-pegawai.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KatalogPegawaiPageRoutingModule
  ],
  declarations: [KatalogPegawaiPage]
})
export class KatalogPegawaiPageModule {}
