import { Component, OnInit } from "@angular/core";
import { File } from "@ionic-native/file/ngx";
import { HTTP } from "@ionic-native/http/ngx";
import { ModalController } from "@ionic/angular";
import { LocalNotifications } from "@awesome-cordova-plugins/local-notifications/ngx";
import { FileOpener } from "@awesome-cordova-plugins/file-opener/ngx";
@Component({
  selector: "app-file-download-modal",
  templateUrl: "./file-download-modal.component.html",
  styleUrls: ["./file-download-modal.component.scss"],
})
export class FileDownloadModalComponent implements OnInit {
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  url: string;
  fileType = "";
  bulan = "";
  tahun = "";
  downloadedFilePath: string;
  type: string;
  private downloadedFile;
  constructor(
    private modalController: ModalController,
    private nativeHTTP: HTTP,
    private file: File,
    private http: HTTP,
    private localNotifications: LocalNotifications,
    private fileOpener: FileOpener
  ) {}

  ngOnInit() {
    console.log(this.url);
  }

  async close() {
    await this.modalController.dismiss();
  }

  downloadFile() {
    this.http.setServerTrustMode("nocheck");
    var url = this.url;
    if (url.endsWith(".pdf")) {
      this.type = "application/pdf";
      this.fileType = "pdf";
    } else if (url.endsWith("xls") || url.endsWith("xlsx")) {
      this.type = "application/vnd.ms-excel";
      this.fileType = "xlsx";
    }
    console.log(this.type);

    this.http
      .sendRequest(url, { method: "get", responseType: "arraybuffer" })
      .then((httpResponse) => {
        console.log("File dowloaded successfully");
        this.downloadedFile = new Blob([httpResponse.data], {
          type: this.type,
        });
        this.writeFile();

        this.localNotifications.schedule({
          id: 1,
          text: "File downloaded successfully, check your internal storage",
          sound: "file://sound.mp3",
        });

        this.modalController.dismiss();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async writeFile() {
    if (this.downloadedFile == null) return;

    if (this.url.endsWith("pdf")) {
      var filename = "myDownloadedPdfFile3.pdf";
    } else {
      var filename = "myDownloadedPdfFile3.xlsx";
    }
    console.log(filename);
    await this.createFile(filename || "myDownloadedPdfFile3.pdf");
    await this.writeToFile(filename || "myDownloadedPdfFile3.pdf");
  }

  async createFile(filename) {
    return this.file
      .createFile(this.file.externalRootDirectory, filename, false)
      .catch((err) => {
        console.error(err);
      });
  }

  writeToFile(filename) {
    console.log(`writing to file- ${filename}`);
    return this.file
      .writeFile(
        this.file.externalRootDirectory,
        filename,
        this.downloadedFile,
        { replace: true, append: false }
      )
      .then((createdFile) => {
        console.log("File written successfully.");
        console.log(createdFile);
        this.fileOpener
          .showOpenWithDialog(createdFile.nativeURL, this.type)
          .then(() => console.log("File is opened"))
          .catch((e) => console.log("Error opening file", e));
        this.downloadedFilePath = createdFile.nativeURL;
      })
      .catch((err) => {
        console.error(err.message);
      });
  }
}
