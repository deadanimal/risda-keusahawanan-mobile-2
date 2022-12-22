import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarianUsahawanTarikhLawatanPageRoutingModule } from './carian-usahawan-tarikh-lawatan-routing.module';

import { CarianUsahawanTarikhLawatanPage } from './carian-usahawan-tarikh-lawatan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarianUsahawanTarikhLawatanPageRoutingModule
  ],
  declarations: [CarianUsahawanTarikhLawatanPage]
})
export class CarianUsahawanTarikhLawatanPageModule {}
