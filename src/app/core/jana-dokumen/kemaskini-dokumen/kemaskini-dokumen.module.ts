import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KemaskiniDokumenPageRoutingModule } from './kemaskini-dokumen-routing.module';

import { KemaskiniDokumenPage } from './kemaskini-dokumen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KemaskiniDokumenPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [KemaskiniDokumenPage]
})
export class KemaskiniDokumenPageModule {}
