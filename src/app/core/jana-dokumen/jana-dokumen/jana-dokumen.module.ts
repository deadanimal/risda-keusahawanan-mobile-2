import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JanaDokumenPageRoutingModule } from './jana-dokumen-routing.module';

import { JanaDokumenPage } from './jana-dokumen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JanaDokumenPageRoutingModule
  ],
  declarations: [JanaDokumenPage]
})
export class JanaDokumenPageModule {}
