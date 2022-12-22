import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PengesahanTarikhLawatanPgwPageRoutingModule } from './pengesahan-tarikh-lawatan-pgw-routing.module';

import { PengesahanTarikhLawatanPgwPage } from './pengesahan-tarikh-lawatan-pgw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PengesahanTarikhLawatanPgwPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PengesahanTarikhLawatanPgwPage]
})
export class PengesahanTarikhLawatanPgwPageModule {}
