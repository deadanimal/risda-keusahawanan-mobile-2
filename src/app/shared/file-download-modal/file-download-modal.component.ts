import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-file-download-modal",
  templateUrl: "./file-download-modal.component.html",
  styleUrls: ["./file-download-modal.component.scss"],
})
export class FileDownloadModalComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async close() {
    await this.modalController.dismiss();
  }
}
