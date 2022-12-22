import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarianUsahawanPageRoutingModule } from './carian-usahawan-routing.module';

import { CarianUsahawanPage } from './carian-usahawan.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarianUsahawanPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [CarianUsahawanPage]
})
export class CarianUsahawanPageModule {}
