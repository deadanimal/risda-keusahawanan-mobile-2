import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TambahKatalogPageRoutingModule } from './tambah-katalog-routing.module';

import { TambahKatalogPage } from './tambah-katalog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TambahKatalogPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TambahKatalogPage]
})
export class TambahKatalogPageModule {}
