import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { LoginModel } from "src/app/services/login/login.model";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { PekebunModel } from "src/app/services/pekebun/pekebun.model";
import { PekebunService } from "src/app/services/pekebun/pekebun.service";
import { PekebunKecilService } from "src/app/services/PekebunKecil/pekebun-kecil.service";
import { NegeriService } from "src/app/services/negeri/negeri.service";
import { DaerahService } from "src/app/services/daerah/daerah.service";
import { MukimService } from "src/app/services/mukim/mukim.service";
import { ParlimenService } from "src/app/services/parlimen/parlimen.service";
import { DunService } from "src/app/services/dun/dun.service";
import { KampungService } from "src/app/services/kampung/kampung.service";
import { SeksyenService } from "src/app/services/seksyen/seksyen.service";
import {
  AlertController,
  LoadingController,
  ModalController,
} from "@ionic/angular";
import { LokalitiTanahPage } from "./lokaliti-tanah/lokaliti-tanah.page";
@Component({
  selector: "app-profile-pekebun",
  templateUrl: "./profile-pekebun.page.html",
  styleUrls: ["./profile-pekebun.page.scss"],
})
export class ProfilePekebunPage implements OnInit {
  form: FormGroup;

  usahawan_id: any;
  user_id: any;
  pekebunKecil: any;
  tanah = [];
  tanaman = [];

  constructor(
    private pekebunService: PekebunService,
    private router: Router,
    private pekebun: PekebunModel,
    // private pekebunKecilService: PekebunKecilService,
    private formBuilder: FormBuilder,
    private negeriService: NegeriService,
    private daerahService: DaerahService,
    private mukimService: MukimService,
    private parlimenService: ParlimenService,
    private dunService: DunService,
    private kampungService: KampungService,
    private seksyenService: SeksyenService,
    private loadingController: LoadingController,
    public alertController: AlertController,
    private modalController: ModalController
  ) {
    this.form = this.formBuilder.group({
      // no_kp: ['',],
      // usahawanid: ['',],
      Nama_PK: [""],
      No_KP: [""],
      noTS: [""],
      Tanah: this.formBuilder.array([]),
    });
  }

  /** Tanah */
  tanahs(): FormArray {
    return this.form.get("Tanah") as FormArray;
  }

  newTanah(): FormGroup {
    return this.formBuilder.group({
      pekebunid: [""],
      No_Geran: [""],
      No_Lot: [""],
      U_Negeri_ID: [""],
      U_Daerah_ID: [""],
      U_Mukim_ID: [""],
      U_Parlimen_ID: [""],
      U_Dun_ID: [""],
      U_Kampung_ID: [""],
      U_Seksyen_ID: [""],

      Luas_Lot: [""],

      Tanaman: this.formBuilder.array([]),
    });
  }

  addTanah() {
    this.tanahs().push(this.newTanah());
  }

  /** tanaman */

  tanamans(ti): FormArray {
    return this.tanahs().at(ti).get("Tanaman") as FormArray;
  }

  newTanaman(): FormGroup {
    return this.formBuilder.group({
      tanahid: [""],
      Jenis_Tanaman: [""],
    });
  }

  addTanaman(ti: number) {
    this.tanamans(ti).push(this.newTanaman());
  }

  removeTanaman(ti: number, bi: number) {
    this.tanamans(ti).removeAt(ti);
  }

  ngOnInit() {
    this.usahawan_id = window.sessionStorage.getItem("usahawan_id");
    this.user_id = window.sessionStorage.getItem("user_id");

    console.log("usahawan id", this.usahawan_id);
    console.log("user id", this.user_id);

    this.getPekebun();
    this.getLocaliti();
  }

  async onSubmit() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "",
      message: "Adakah anda setuju untuk menyimpan perubahan ini?",
      buttons: [
        {
          text: "Tidak",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Ya",
          handler: async () => {
            console.log(this.form.value);

            this.pekebunService
              .update(this.form.value, this.pekebun.id)
              .subscribe((res) => {
                console.log("response", res);

                this.pekebunService
                  .deleteTanah(res.id)
                  .subscribe((deletedData) => {
                    console.log("deletedData", deletedData);
                  });

                this.form.value.Tanah.forEach((element) => {
                  console.log("submit tanah", element);

                  this.pekebunService
                    .updateTanah(element, res.id)
                    .subscribe((res2) => {
                      console.log("updateTanah", res2);

                      this.pekebunService
                        .deleteTanaman(res2)
                        .subscribe((deletedTanaman) => {
                          console.log("deletedTanaman", deletedTanaman);
                        });

                      element.Tanaman.forEach((element2) => {
                        console.log("submit tanaman", element2);

                        this.pekebunService
                          .updateTanaman(element2, res2)
                          .subscribe((updatedTanaman) => {
                            console.log("updatedTanaman", updatedTanaman);
                          });
                      });
                    });
                });

                this.presentAlert();
              });
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Kemaskini Berjaya",
      subHeader: "Kemaskini Maklumat Pekebun Telah Berjaya",
      message: "",
      buttons: ["OK"],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log("onDidDismiss resolved with role", role);
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Harap Maaf",
      subHeader: "Tiada Rekod Pekebun Dijumpai",
      message: "",
      buttons: ["OK"],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log("onDidDismiss resolved with role", role);
  }

  async patchValue2() {
    // console.log("yeayyy", this.pekebunKecil)

    const loading = await this.loadingController.create({
      message: "Loading ...",
    });
    loading.present();

    this.pekebunKecil.Tanah.forEach((t) => {
      var tanah: FormGroup = this.newTanah();

      // console.log("patch tanah", tanah.value);
      this.tanahs().push(tanah);

      t.Tanaman.forEach((b) => {
        // console.log(b)
        var tanaman = this.newTanaman();

        (tanah.get("Tanaman") as FormArray).push(tanaman);
      });
    });

    this.form.patchValue(this.pekebunKecil);

    console.log("form", this.form.value);

    loading.dismiss();
  }

  async getPekebun() {
    const loading = await this.loadingController.create({
      message: "Loading ...",
    });
    loading.present();

    this.pekebunService.show(this.usahawan_id).subscribe(
      (res) => {
        console.log("pekebun info", res);

        if (Object.keys(res).length === 0) {
          console.log("failed");

          loading.dismiss();
          this.presentAlert2();
        } else {
          if (res.No_KP == null || res.No_KP == "") {
            loading.dismiss();
            this.presentAlert2();
          } else {
            this.pekebun = res;

            this.getMaklumatPekebun(res.No_KP);
            this.getNoTS(res.No_KP);

            loading.dismiss();
          }
        }
      },
      (err) => {
        loading.dismiss();
        alert("Something went wrong");
      }
    );
  }

  async getMaklumatPekebun(nokp) {
    const loading = await this.loadingController.create({
      message: "Loading ...",
    });
    loading.present();

    this.pekebunService.getPekebunEpek(nokp).subscribe(
      (res) => {
        console.log("pekebun kecil info", res);

        // let response = parseInt(res);
        if (res == 400) {
          console.log("takde data");
          loading.dismiss();
          this.presentAlert2();
        } else {
          console.log("yeayyy", this.pekebunKecil);
          this.pekebunKecil = res[0];
          this.patchValue2();

          loading.dismiss();
        }
      },
      (err) => {
        loading.dismiss();
        alert("Something went wrong");
      }
    );
  }

  getNoTS(nokp) {
    this.pekebunService.getNoTS(nokp).subscribe((res) => {
      console.log("noTS", res);

      // console.log("resaaaaa", res)
      if (res == 400) {
        this.form.patchValue({
          // noTS: null
        });
      } else {
        this.form.patchValue({
          noTS: res[0].noTS,
        });
      }
    });
  }

  negeri: any;
  daerah: any;
  mukim: any;
  parlimen: any;
  dun: any;
  kampung: any;
  seksyen: any;

  getLocaliti() {
    this.negeriService.get().subscribe((resNegeri) => {
      console.log("Negeri", resNegeri);
      this.negeri = resNegeri;

      this.daerahService.get().subscribe((resDaerah) => {
        console.log("resDaerah", resDaerah);
        this.daerah = resDaerah;
      });
    });
  }

  async openMyModal(tanah, index) {
    let maklumatTanah = [
      {
        data: tanah.value,
        index: index,
      },
    ];

    console.log("maklumatTanah", maklumatTanah);

    console.log("tanah", tanah.value);

    // let data = tanah.value
    const myModal = await this.modalController.create({
      component: LokalitiTanahPage,
      backdropDismiss: true,
      cssClass: "options_modal",
      componentProps: { maklumatTanah },
    });
    return await myModal.present();
  }

  back() {
    this.router.navigate(["/profile"]);
  }
}
