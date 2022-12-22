import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PdfExcelService } from "src/app/services/pdfExcel/pdf-excel.service";
import { environment } from "src/environments/environment";
import { InAppBrowser } from "@awesome-cordova-plugins/in-app-browser/ngx";
import { Router } from "@angular/router";
import { FileDownloadModalComponent } from "src/app/shared/file-download-modal/file-download-modal.component";
import { ModalController, Platform } from "@ionic/angular";
import {
  DocumentViewer,
  DocumentViewerOptions,
} from "@awesome-cordova-plugins/document-viewer/ngx";
import { platform } from "os";

@Component({
  selector: "app-buku-tunai",
  templateUrl: "./buku-tunai.page.html",
  styleUrls: ["./buku-tunai.page.scss"],
})
export class BukuTunaiPage implements OnInit {
  date = new Date();

  year: any;

  month: any;

  filteredYear: any;
  filteredMonth: any;
  filtered: boolean = false;
  options: DocumentViewerOptions = {
    title: "My PDF",
  };
  private form: FormGroup;

  listYear = [];
  listMonth = [
    { value: "1", name: "January" },
    { value: "2", name: "February" },
    { value: "3", name: "March" },
    { value: "4", name: "April" },
    { value: "5", name: "May" },
    { value: "6", name: "June" },
    { value: "7", name: "July" },
    { value: "8", name: "August" },
    { value: "9", name: "September" },
    { value: "10", name: "October" },
    { value: "11", name: "November" },
    { value: "12", name: "December" },
  ];
  // bulan = new Date()

  selectMonthList = this.listMonth;
  selectYearList = this.listYear;

  constructor(
    private formBuilder: FormBuilder,
    private pdfExcelService: PdfExcelService,
    private iab: InAppBrowser,
    private router: Router,
    private modalController: ModalController,
    private document: DocumentViewer,
    private platform: Platform
  ) {
    this.form = this.formBuilder.group({
      id: [""],
      bulan: ["", Validators.required],
      tahun: ["", Validators.required],
    });
  }

  user_id: any;
  ngOnInit() {
    this.user_id = window.sessionStorage.getItem("user_id");

    // console.log("AAAAA", this.date.getMonth() + 1);
    // console.log("BBB", this.date.getFullYear());
    this.month = this.date.getMonth() + 1;
    this.year = Number(this.date.getFullYear());
    for (let i = 0; i <= 30; i++) {
      this.listYear.push(this.year);
      this.year = this.year - 1;
    }
    this.selectYearList = this.listYear;
  }

  logForm() {
    console.log(this.form.value);
  }

  printExcelCustom() {
    this.form.value.id = this.user_id;
    console.log(this.form.value);

    this.pdfExcelService.bukuTunaiExcel(this.form.value).subscribe((res) => {
      console.log("res", res);

      let url = environment.baseUrl + "storage/" + res;
      this.document.viewDocument(url, "application/pdf", this.options);

      console.log(url);
      // window.open(url, "_blank");
      // const browser = this.iab.create(url, "_system");
    });
  }

  printPdfCustom() {
    this.form.value.id = this.user_id;
    console.log(this.form.value);

    this.pdfExcelService.bukuTunaiPdf(this.form.value).subscribe((res) => {
      console.log("res", res);

      let url = environment.baseUrl + "storage/" + res;

      if (this.platform.is("android")) {
        this.document.viewDocument(url, "application/pdf", this.options);
      } else {
        console.log("not android");
        window.open(url, "_blank");
      }

      console.log(url);
      // window.open(url, "_blank");
      // const browser = this.iab.create(url, "_system");
    });
  }

  printExcel(bulan) {
    this.form.value.id = this.user_id;
    this.form.value.bulan = bulan;
    this.form.value.tahun = this.date.getFullYear();
    console.log(this.form.value);

    this.pdfExcelService.bukuTunaiExcel(this.form.value).subscribe((res) => {
      console.log("res", res);

      let url = environment.baseUrl + "storage/" + res;

      // const browser = this.iab.create(url, "_system");
      // if (this.platform.is("android")) {
      //   this.document.viewDocument(url, "application/pdf", this.options);
      // } else {
      //   console.log("not android");
      //   window.open(url, "_blank");
      // }

      this.presentModal();
    });
  }

  printPdf(bulan) {
    this.form.value.id = this.user_id;
    this.form.value.bulan = bulan;
    this.form.value.tahun = this.date.getFullYear();
    console.log(this.form.value);

    this.pdfExcelService.bukuTunaiPdf(this.form.value).subscribe((res) => {
      console.log("res", res);

      let url = environment.baseUrl + "storage/" + res;
      // this.document.viewDocument(url, "application/pdf", this.options);
      this.presentModal();

      console.log(url);
      // window.open(url, "_blank");
      // const browser = this.iab.create(url, "_system");
    });
  }

  share() {
    console.log("share");
  }

  dashboard() {
    this.router.navigate(["/dashboard"]);
  }

  filter() {
    console.log(this.filtered);
    if (this.filtered) {
      this.reset();
      this.filtered = false;
    }

    if (this.form.value.tahun == "" && this.form.value.bulan == "") {
      console.log("do nothing");
      this.filtered = false;
    } else if (this.form.value.tahun == "" && this.form.value.bulan != "") {
      this.listMonth = this.listMonth.filter((item) => {
        return item.value == this.form.value.bulan;
      });

      console.log("filter by bulan");
    } else if (this.form.value.tahun != "" && this.form.value.bulan == "") {
      this.listYear = this.listYear.filter((item) => {
        return item == this.form.value.tahun;
      });
      console.log("filter by tahun");
    } else if (this.form.value.tahun != "" && this.form.value.bulan != "") {
      this.listYear = this.listYear.filter((item) => {
        return item == this.form.value.tahun;
      });
    }
    this.filtered = true;
  }

  reset() {
    this.listMonth = this.selectMonthList;
    this.listYear = this.selectYearList;
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: FileDownloadModalComponent,
      componentProps: { value: 123 },
    });

    await modal.present();
  }
}
