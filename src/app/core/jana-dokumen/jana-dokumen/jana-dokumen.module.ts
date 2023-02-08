import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JanaDokumenPageRoutingModule } from './jana-dokumen-routing.module';

import { JanaDokumenPage } from './jana-dokumen.page';
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file/ngx";
import { HTTP } from "@ionic-native/http/ngx";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JanaDokumenPageRoutingModule
  ],
  declarations: [JanaDokumenPage],
  providers: [FileTransfer, File, HTTP],
})
export class JanaDokumenPageModule { }
