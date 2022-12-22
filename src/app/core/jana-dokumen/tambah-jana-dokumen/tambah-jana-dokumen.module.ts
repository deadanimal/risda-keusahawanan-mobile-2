import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TambahJanaDokumenPageRoutingModule } from './tambah-jana-dokumen-routing.module';

import { TambahJanaDokumenPage } from './tambah-jana-dokumen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TambahJanaDokumenPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TambahJanaDokumenPage]
})
export class TambahJanaDokumenPageModule {}
