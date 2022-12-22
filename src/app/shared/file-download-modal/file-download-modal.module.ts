import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FileDownloadModalComponent } from "./file-download-modal.component";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [FileDownloadModalComponent],
  imports: [CommonModule, IonicModule],
  exports: [FileDownloadModalComponent],
})
export class FileDownloadModalModule {}
