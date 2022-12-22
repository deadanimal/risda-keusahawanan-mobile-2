import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SenaraiLaporanPegawaiPageRoutingModule } from './senarai-laporan-pegawai-routing.module';

import { SenaraiLaporanPegawaiPage } from './senarai-laporan-pegawai.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SenaraiLaporanPegawaiPageRoutingModule
  ],
  declarations: [SenaraiLaporanPegawaiPage]
})
export class SenaraiLaporanPegawaiPageModule {}
