import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LawatanUsahawanPageRoutingModule } from './lawatan-usahawan-routing.module';

import { LawatanUsahawanPage } from './lawatan-usahawan.page';
import { HTTP } from '@ionic-native/http/ngx';
// import { File } from '@ionic-native/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LawatanUsahawanPageRoutingModule,
  ],
  declarations: [LawatanUsahawanPage],

  providers: [
    HTTP,
    // File
  ]
})
export class LawatanUsahawanPageModule { }
