import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LawatanPegawaiPageRoutingModule } from './lawatan-pegawai-routing.module';

import { LawatanPegawaiPage } from './lawatan-pegawai.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LawatanPegawaiPageRoutingModule
  ],
  declarations: [LawatanPegawaiPage]
})
export class LawatanPegawaiPageModule {}
