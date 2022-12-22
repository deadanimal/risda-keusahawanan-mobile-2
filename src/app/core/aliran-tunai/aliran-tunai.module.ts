import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AliranTunaiPageRoutingModule } from './aliran-tunai-routing.module';

import { AliranTunaiPage } from './aliran-tunai.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AliranTunaiPageRoutingModule
  ],
  declarations: [AliranTunaiPage]
})
export class AliranTunaiPageModule {}
