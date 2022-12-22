import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RingkasanLejarPageRoutingModule } from './ringkasan-lejar-routing.module';

import { RingkasanLejarPage } from './ringkasan-lejar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RingkasanLejarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RingkasanLejarPage]
})
export class RingkasanLejarPageModule {}
