import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BukuTunaiPageRoutingModule } from "./buku-tunai-routing.module";

import { BukuTunaiPage } from "./buku-tunai.page";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file/ngx";
import { HTTP } from "@ionic-native/http/ngx";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BukuTunaiPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [BukuTunaiPage],
  providers: [FileTransfer, File, HTTP],
})
export class BukuTunaiPageModule {}
