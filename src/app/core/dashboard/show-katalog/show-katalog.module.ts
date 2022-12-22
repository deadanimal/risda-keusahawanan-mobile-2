import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowKatalogPageRoutingModule } from './show-katalog-routing.module';

import { ShowKatalogPage } from './show-katalog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowKatalogPageRoutingModule
  ],
  declarations: [ShowKatalogPage]
})
export class ShowKatalogPageModule {}
