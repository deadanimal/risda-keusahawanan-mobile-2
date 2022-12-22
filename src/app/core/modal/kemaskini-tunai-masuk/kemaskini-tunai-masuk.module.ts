import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KemaskiniTunaiMasukPageRoutingModule } from './kemaskini-tunai-masuk-routing.module';

import { KemaskiniTunaiMasukPage } from './kemaskini-tunai-masuk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KemaskiniTunaiMasukPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [KemaskiniTunaiMasukPage]
})
export class KemaskiniTunaiMasukPageModule {}
