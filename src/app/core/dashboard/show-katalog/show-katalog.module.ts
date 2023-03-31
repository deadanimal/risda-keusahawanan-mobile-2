import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowKatalogPageRoutingModule } from './show-katalog-routing.module';

import { ShowKatalogPage } from './show-katalog.page';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { File } from "@ionic-native/file/ngx";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowKatalogPageRoutingModule
  ],
  declarations: [ShowKatalogPage],
  providers: [FileTransfer, File , HTTP],

})
export class ShowKatalogPageModule {}
