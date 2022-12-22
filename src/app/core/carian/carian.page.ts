import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CarianService } from "src/app/services/carian/carian.service";
import { JenisInsentifService } from "src/app/services/jenis-insentif/jenis-insentif.service";
import { NegeriService } from "src/app/services/negeri/negeri.service";
import { PusatTanggungjawabService } from "src/app/services/pusat-tanggungjawab/pusat-tanggungjawab.service";
import { environment } from "src/environments/environment";
import { InAppBrowser } from "@awesome-cordova-plugins/in-app-browser/ngx";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-carian",
  templateUrl: "./carian.page.html",
  styleUrls: ["./carian.page.scss"],
})
export class CarianPage implements OnInit {
  pusat_tanggungjawab: any;
  jenis_insentif: any;

  negeri: any;

  date = new Date();
  listYear = [];
  year: any;

  form: FormGroup;

  constructor(
    private ptService: PusatTanggungjawabService,
    private jenisInsentifService: JenisInsentifService,
    private carianService: CarianService,
    private formBuilder: FormBuilder,
    private negeriService: NegeriService,
    private iab: InAppBrowser,
    private router: Router,
    public loadingController: LoadingController
  ) {
    this.form = this.formBuilder.group({
      nama: [""],
      noKP: [""],
      negeri: [""],
      PT: [""],
    });
  }

  ngOnInit() {
    this.getNegeri();
    this.getPT();
    this.getJenisInsentif();

    this.year = Number(this.date.getFullYear());
    for (let i = 0; i <= 30; i++) {
      this.listYear.push(this.year);
      this.year = this.year - 1;
    }
  }

  getPT() {
    this.ptService.get().subscribe((res) => {
      console.log("res", res);

      this.pusat_tanggungjawab = res;
    });
  }

  getJenisInsentif() {
    this.jenisInsentifService.get().subscribe((res) => {
      console.log("res", res);

      this.jenis_insentif = res;
    });
  }

  input_carian: any;
  usahawan: any;
  usahawanTemp: any;

  kod_pt: any = null;
  insentif: any = null;
  tahun_terima: any = null;

  getUsahawan() {
    this.carianService.get(this.input_carian).subscribe((res) => {
      console.log("maklumat usahawan", res);
      this.usahawan = res;
      this.usahawanTemp = res;
    });
  }

  tapisan() {
    let tempData = [];
    if (
      this.kod_pt == null &&
      this.insentif == null &&
      this.tahun_terima != null
    ) {
      this.usahawan.forEach((element) => {
        let insentif = element.insentif;
        for (let i = 0; i < insentif.length; i++) {
          // const element = array[index];

          if (insentif[i].tahun_terima_insentif == this.tahun_terima) {
            console.log("tahun terima insentif", insentif);
            tempData.push(element);
            break;
          }
        }
      });
    } else if (
      this.kod_pt == null &&
      this.insentif != null &&
      this.tahun_terima == null
    ) {
      this.usahawan.forEach((element) => {
        let insentif = element.insentif;

        for (let i = 0; i < insentif.length; i++) {
          // const element = array[index];

          if (insentif[i].id_jenis_insentif == this.insentif) {
            console.log("jenis insentif", insentif);
            tempData.push(element);
            break;
          }
        }
      });
    } else if (
      this.kod_pt == null &&
      this.insentif != null &&
      this.tahun_terima != null
    ) {
      this.usahawan.forEach((element) => {
        let insentif = element.insentif;

        for (let i = 0; i < insentif.length; i++) {
          // const element = array[index];

          if (
            insentif[i].id_jenis_insentif == this.insentif &&
            insentif[i].tahun_terima_insentif == this.tahun_terima
          ) {
            console.log("jenis insentif", insentif);
            tempData.push(element);
            break;
          }
        }
      });
    } else if (
      this.kod_pt != null &&
      this.insentif == null &&
      this.tahun_terima == null
    ) {
      this.usahawan.forEach((element) => {
        if (element.Kod_PT == this.kod_pt) {
          console.log("kod pt", element);
          tempData.push(element);
        }
      });
    } else if (
      this.kod_pt != null &&
      this.insentif == null &&
      this.tahun_terima != null
    ) {
      this.usahawan.forEach((element) => {
        let insentif = element.insentif;

        for (let i = 0; i < insentif.length; i++) {
          // const element = array[index];

          if (
            insentif[i].tahun_terima_insentif == this.tahun_terima &&
            element.Kod_PT == this.kod_pt
          ) {
            console.log("filtered", insentif);
            tempData.push(element);
            break;
          }
        }
      });
    } else if (
      this.kod_pt != null &&
      this.insentif != null &&
      this.tahun_terima == null
    ) {
      this.usahawan.forEach((element) => {
        let insentif = element.insentif;

        for (let i = 0; i < insentif.length; i++) {
          // const element = array[index];

          if (
            insentif[i].id_jenis_insentif == this.insentif &&
            element.Kod_PT == this.kod_pt
          ) {
            console.log("filtered", insentif);
            tempData.push(element);
            break;
          }
        }
      });
    } else if (
      this.kod_pt != null &&
      this.insentif != null &&
      this.tahun_terima != null
    ) {
      this.usahawan.forEach((element) => {
        let insentif = element.insentif;

        for (let i = 0; i < insentif.length; i++) {
          // const element = array[index];

          if (
            insentif[i].id_jenis_insentif == this.insentif &&
            insentif[i].tahun_terima_insentif == this.tahun_terima &&
            element.Kod_PT == this.kod_pt
          ) {
            console.log("filtered", insentif);
            tempData.push(element);
            break;
          }
        }
      });
    }

    this.usahawanTemp = tempData;
  }

  reset() {
    this.form.reset();
  }

  downloadFile(usahawanid) {
    console.log(usahawanid);

    this.carianService.downloadFile(usahawanid).subscribe((res) => {
      console.log("res3", res);

      let url = environment.baseUrl + "storage/" + res;

      console.log(url);

      const browser = this.iab.create(url, "_system");

      // window.open(url, "_blank");
    });
  }

  next_page_url: any = null;
  previous_page_url: any = null;

  logform() {
    console.log(this.form.value);

    this.carianService.cariUsahawan(this.form.value).subscribe((res) => {
      console.log("res3", res);

      this.usahawanTemp = res.data;
      this.next_page_url = res.next_page_url;
      this.previous_page_url = res.prev_page_url;
      // let url = environment.baseUrl + 'storage/' + res;

      // console.log(url);
      // window.open(url, "_blank");
    });
  }

  async next_page() {
    // const loading = await this.loadingController.create({ message: 'Loading ...' });
    // loading.present();

    this.carianService.page(this.next_page_url, this.form.value).subscribe(
      (res) => {
        console.log("res3", res);

        this.usahawanTemp = res.data;
        this.next_page_url = res.next_page_url;
        this.previous_page_url = res.prev_page_url;

        // loading.dismiss();
      },
      (err) => {
        // loading.dismiss();
        alert("Something went wrong");
      }
    );
  }

  previous_page() {
    this.carianService.page(this.previous_page_url, this.form.value).subscribe(
      (res) => {
        console.log("res3", res);

        this.usahawanTemp = res.data;
        this.next_page_url = res.next_page_url;
        this.previous_page_url = res.prev_page_url;
      },
      (err) => {
        alert(err);
      }
    );
  }

  getNegeri() {
    this.negeriService.get().subscribe((res) => {
      console.log("resnegeri", res);

      this.negeri = res;
    });
  }

  dashboard() {
    this.router.navigate(["/dashboard"]);
  }
}
