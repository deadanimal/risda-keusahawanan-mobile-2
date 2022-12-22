import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TambahTunaiKeluarPageRoutingModule } from './tambah-tunai-keluar-routing.module';

import { TambahTunaiKeluarPage } from './tambah-tunai-keluar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TambahTunaiKeluarPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [TambahTunaiKeluarPage]
})
export class TambahTunaiKeluarPageModule {}
