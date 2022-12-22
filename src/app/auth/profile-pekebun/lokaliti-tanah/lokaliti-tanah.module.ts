import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LokalitiTanahPageRoutingModule } from './lokaliti-tanah-routing.module';

import { LokalitiTanahPage } from './lokaliti-tanah.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LokalitiTanahPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LokalitiTanahPage]
})
export class LokalitiTanahPageModule {}
