import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsentifPageRoutingModule } from './insentif-routing.module';

import { InsentifPage } from './insentif.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsentifPageRoutingModule
  ],
  declarations: [InsentifPage]
})
export class InsentifPageModule {}
