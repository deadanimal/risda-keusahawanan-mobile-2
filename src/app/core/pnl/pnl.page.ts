import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PdfExcelService } from 'src/app/services/pdfExcel/pdf-excel.service';
import { environment } from 'src/environments/environment';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pnl',
  templateUrl: './pnl.page.html',
  styleUrls: ['./pnl.page.scss'],
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


  ) {
    this.form = this.formBuilder.group({
      id: ['',],
      bulan: ['', Validators.required],
      tahun: ['', Validators.required],

    });
  }

  user_id: any;
  ngOnInit() {
    this.user_id = window.sessionStorage.getItem("user_id");

    // console.log("AAAAA", this.date.getMonth() + 1);
    // console.log("BBB", this.date.getFullYear());
    this.month = this.date.getMonth() + 1
    this.year = Number(this.date.getFullYear());
    for (let i = 0; i <= 30; i++) {

      this.listYear.push(this.year)
      this.year = this.year - 1

    }


  }

  pnl=[];
  logform() {
    console.log(this.form.value)

    this.form.value.id = this.user_id;
    console.log(this.form.value)

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
    console.log(this.form.value)

    this.pdfExcelService.pnlExcel(this.form.value).subscribe((res) => {
      console.log("res", res);

      let url = environment.baseUrl + 'storage/' + res;

      console.log(url);
      // window.open(url, "_blank");
      const browser = this.iab.create(url, '_system');


    });
  }

  printPdfCustom() {
    this.form.value.id = this.user_id;
    console.log(this.form.value)

    this.pdfExcelService.pnlPdf(this.form.value).subscribe((res) => {
      console.log("res", res);

      let url = environment.baseUrl + 'storage/' + res;

      console.log(url);
      // window.open(url, "_blank");
      const browser = this.iab.create(url, '_system');


    });
  }


  printExcel(bulan) {

    this.form.value.id = this.user_id;
    this.form.value.bulan = bulan;
    this.form.value.tahun = this.date.getFullYear();
    console.log(this.form.value)

    this.pdfExcelService.pnlExcel(this.form.value).subscribe((res) => {
      console.log("res", res);

      let url = environment.baseUrl + 'storage/' + res;

      console.log(url);
      // window.open(url, "_blank");
      const browser = this.iab.create(url, '_system');


    });
  }

  printPdf(bulan) {

    this.form.value.id = this.user_id;
    this.form.value.bulan = bulan;
    this.form.value.tahun = this.date.getFullYear();
    console.log(this.form.value)

    this.pdfExcelService.pnlPdf(this.form.value).subscribe((res) => {
      console.log("res", res);

      let url = environment.baseUrl + 'storage/' + res;

      console.log(url);
      // window.open(url, "_blank");
      const browser = this.iab.create(url, '_system');


    });
  }

  share() {
    console.log("share")
  }

  dashboard() {
    this.router.navigate(['/dashboard'])
  }

}
