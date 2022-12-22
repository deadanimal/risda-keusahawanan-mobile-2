import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SenaraiKatalogPageRoutingModule } from './senarai-katalog-routing.module';

import { SenaraiKatalogPage } from './senarai-katalog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SenaraiKatalogPageRoutingModule
  ],
  declarations: [SenaraiKatalogPage]
})
export class SenaraiKatalogPageModule {}
