import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RingkasanLejarPageRoutingModule } from "./ringkasan-lejar-routing.module";

import { RingkasanLejarPage } from "./ringkasan-lejar.page";
import { File } from "@ionic-native/file/ngx";
import { HTTP } from "@ionic-native/http/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RingkasanLejarPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [RingkasanLejarPage],

  providers: [FileTransfer, File, HTTP],
})
export class RingkasanLejarPageModule {}
