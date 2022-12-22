import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaklumatProdukPageRoutingModule } from './maklumat-produk-routing.module';

import { MaklumatProdukPage } from './maklumat-produk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaklumatProdukPageRoutingModule
  ],
  declarations: [MaklumatProdukPage]
})
export class MaklumatProdukPageModule {}
