import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PdfExcelService } from "src/app/services/pdfExcel/pdf-excel.service";
import { environment } from "src/environments/environment";
import { InAppBrowser } from "@awesome-cordova-plugins/in-app-browser/ngx";
import { Router } from "@angular/router";
import { LoadingController, ModalController } from "@ionic/angular";
import { FileDownloadModalComponent } from "src/app/shared/file-download-modal/file-download-modal.component";

@Component({
  selector: "app-pnl",
  templateUrl: "./pnl.page.html",
  styleUrls: ["./pnl.page.scss"],
})
export class PnlPage implements OnInit {
  date = new Date();

  year: any;

  month: any;

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

  constructor(
    private formBuilder: FormBuilder,
    private pdfExcelService: PdfExcelService,
    private iab: InAppBrowser,
    private router: Router,
    private modalController: ModalController,
    private loadingController: LoadingController
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
  }

  pnl = [];
  logform() {
    console.log(this.form.value);

    this.form.value.id = this.user_id;
    console.log(this.form.value);

    this.pnl = [];
    this.pdfExcelService.pnlInfo(this.form.value).subscribe((res) => {
      console.log("res", res);
      // this.pnl = res;
      this.pnl.push(res);

      console.log("pnl", this.pnl);
    });
  }

  printExcelCustom() {
    this.form.value.id = this.user_id;
    console.log(this.form.value);
    this.presentLoading();

    this.pdfExcelService.pnlExcel(this.form.value).subscribe((res) => {
      console.log("res", res);

      let url = environment.baseUrl + "storage/" + res;

      this.loadingController.dismiss();

      this.presentModal(url, this.form.value.bulan, this.form.value.tahun);
    });
  }

  printPdfCustom() {
    this.form.value.id = this.user_id;
    console.log(this.form.value);
    this.presentLoading();
    this.pdfExcelService.pnlPdf(this.form.value).subscribe((res) => {
      console.log("res", res);

      let url = environment.baseUrl + "storage/" + res;

      // this.downloadFile(url, "report.pdf");
      this.loadingController.dismiss();
      this.presentModal(url, this.form.value.bulan, this.form.value.tahun);
    });
  }

  printExcel(bulan) {
    this.form.value.id = this.user_id;
    this.form.value.bulan = bulan;
    this.form.value.tahun = this.date.getFullYear();
    console.log(this.form.value);
    this.presentLoading();
    this.pdfExcelService.pnlExcel(this.form.value).subscribe((res) => {
      console.log("res", res);

      let url = environment.baseUrl + "storage/" + res;

      this.loadingController.dismiss();
      this.presentModal(url, bulan, this.form.value.tahun);
    });
  }

  printPdf(bulan) {
    this.form.value.id = this.user_id;
    this.form.value.bulan = bulan;
    this.form.value.tahun = this.date.getFullYear();
    console.log(this.form.value);
    this.presentLoading();
    this.pdfExcelService.pnlPdf(this.form.value).subscribe((res) => {
      console.log("res", res);

      let url = environment.baseUrl + "storage/" + res;

      this.loadingController.dismiss();
      this.presentModal(url, bulan, this.form.value.tahun);
    });
  }

  share() {
    console.log("share");
  }

  dashboard() {
    this.router.navigate(["/dashboard"]);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Loading ...",
      duration: 2000,
      spinner: "bubbles",
    });
    await loading.present();
  }

  async presentModal(url: string, bulan: string, tahun: string) {
    const modal = await this.modalController.create({
      component: FileDownloadModalComponent,
      componentProps: { value: 123, url: url, bulan, tahun },
    });

    await modal.present();
  }
}
