import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PnlPageRoutingModule } from "./pnl-routing.module";

import { PnlPage } from "./pnl.page";

import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file/ngx";
import { HTTP } from "@ionic-native/http/ngx";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PnlPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [PnlPage],
  providers: [FileTransfer, File, HTTP],
})
export class PnlPageModule {}
