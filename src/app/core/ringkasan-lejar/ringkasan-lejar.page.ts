import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PdfExcelService } from "src/app/services/pdfExcel/pdf-excel.service";
import { environment } from "src/environments/environment";
import { InAppBrowser } from "@awesome-cordova-plugins/in-app-browser/ngx";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { FileDownloadModalComponent } from "src/app/shared/file-download-modal/file-download-modal.component";

@Component({
  selector: "app-ringkasan-lejar",
  templateUrl: "./ringkasan-lejar.page.html",
  styleUrls: ["./ringkasan-lejar.page.scss"],
})
export class RingkasanLejarPage implements OnInit {
  date = new Date();

  year: any;

  month: any;

  filteredYear: any;
  filteredMonth: any;
  filtered: boolean = false;

  private form: FormGroup;
  user_id = window.sessionStorage.getItem("user_id");

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
    private modalController: ModalController
  ) {
    this.form = this.formBuilder.group({
      id: [""],
      bulan: ["", Validators.required],
      tahun: ["", Validators.required],
    });
  }

  ngOnInit() {
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

    this.pdfExcelService.lejarExcel(this.form.value).subscribe((res) => {
      console.log("res", res);

      let url = environment.baseUrl + "storage/" + res;

      console.log(url);
      // window.open(url, "_blank");
      const browser = this.iab.create(url, "_system");
    });
  }

  printPdfCustom() {
    this.form.value.id = this.user_id;
    console.log(this.form.value);

    this.pdfExcelService.lejarPdf(this.form.value).subscribe((res) => {
      console.log("res", res);

      let url = environment.baseUrl + "storage/" + res;

      console.log(url);
      // window.open(url, "_blank");
      // const browser = this.iab.create(url, "_system");
      this.presentModal();
    });
  }

  printExcel(bulan) {
    this.form.value.id = this.user_id;
    this.form.value.bulan = bulan;
    this.form.value.tahun = this.date.getFullYear();
    console.log(this.form.value);

    this.pdfExcelService.lejarExcel(this.form.value).subscribe((res) => {
      console.log("res", res);

      let url = environment.baseUrl + "storage/" + res;

      console.log(url);
      // window.open(url, "_blank");
      const browser = this.iab.create(url, "_system");
    });
  }

  printPdf(bulan) {
    this.form.value.id = this.user_id;
    this.form.value.bulan = bulan;
    this.form.value.tahun = this.date.getFullYear();
    console.log(this.form.value);

    this.pdfExcelService.lejarPdf(this.form.value).subscribe((res) => {
      console.log("res", res);

      let url = environment.baseUrl + "storage/" + res;

      console.log(url);
      // window.open(url, "_blank");
      // const browser = this.iab.create(url, "_system");
      this.presentModal();
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
