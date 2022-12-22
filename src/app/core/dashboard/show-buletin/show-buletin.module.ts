import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowBuletinPageRoutingModule } from './show-buletin-routing.module';

import { ShowBuletinPage } from './show-buletin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowBuletinPageRoutingModule
  ],
  declarations: [ShowBuletinPage]
})
export class ShowBuletinPageModule {}
