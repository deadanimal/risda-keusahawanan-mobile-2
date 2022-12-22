import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarikhLawatanPgwPageRoutingModule } from './tarikh-lawatan-pgw-routing.module';

import { TarikhLawatanPgwPage } from './tarikh-lawatan-pgw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarikhLawatanPgwPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TarikhLawatanPgwPage]
})
export class TarikhLawatanPgwPageModule {}
