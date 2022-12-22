import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KemaskiniKatalogPageRoutingModule } from './kemaskini-katalog-routing.module';

import { KemaskiniKatalogPage } from './kemaskini-katalog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KemaskiniKatalogPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [KemaskiniKatalogPage]
})
export class KemaskiniKatalogPageModule {}
