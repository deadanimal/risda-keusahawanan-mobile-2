import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KemaskiniTunaiKeluarPageRoutingModule } from './kemaskini-tunai-keluar-routing.module';

import { KemaskiniTunaiKeluarPage } from './kemaskini-tunai-keluar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KemaskiniTunaiKeluarPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [KemaskiniTunaiKeluarPage]
})
export class KemaskiniTunaiKeluarPageModule {}
