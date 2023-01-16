import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";

import { map } from "rxjs/operators";
import { AliranService } from "src/app/services/Aliran/aliran.service";
import { KategoriAliranService } from "src/app/services/kategoriAliran/kategori-aliran.service";
import { Router } from "@angular/router";
import * as moment from "moment";

@Component({
  selector: "app-tambah-tunai-keluar",
  templateUrl: "./tambah-tunai-keluar.page.html",
  styleUrls: ["./tambah-tunai-keluar.page.scss"],
})
export class TambahTunaiKeluarPage implements OnInit {
  private form: FormGroup;

  today: any;

  tunai_keluar: any;

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private aliranService: AliranService,
    private kategoriAliranService: KategoriAliranService,
    private router: Router,
    public alertController: AlertController
  ) {
    this.form = this.formBuilder.group({
      id_pengguna: [""],
      id_kategori_aliran: ["", Validators.required],
      tarikh_aliran: ["", Validators.required],
      keterangan_aliran: ["", Validators.required],
      jumlah_aliran: ["", Validators.required],
      nama_dokumen: [""],
      dokumen_lampiran: [""],
    });
  }

  usahawan_id: any;
  user_id: any;

  ngOnInit() {
    this.usahawan_id = window.sessionStorage.getItem("usahawan_id");
    this.user_id = window.sessionStorage.getItem("user_id");

    this.today = new Date();
    var dd = String(this.today.getDate()).padStart(2, "0");
    var mm = String(this.today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = this.today.getFullYear();

    this.today = yyyy + "-" + mm + "-" + dd;
    console.log("today", this.today);

    this.getKategoriAliran();
  }

  dismiss() {
    this.modalController.dismiss(this.tunai_keluar);
  }

  async logForm() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "",
      message: "Adakah anda setuju untuk menyimpan maklumat ini?",
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
          handler: () => {
            console.log("Confirm Okay");

            this.form.value.id_pengguna = this.user_id;
            this.form.value.tarikh_aliran = moment(
              this.form.value.tarikh_aliran
            ).format("YYYY-MM-DD");
            if (this.file != null) {
              this.form.value.nama_dokumen = this.file.name;
            }

            console.log(this.form.value);

            this.aliranService.post(this.form.value).subscribe((res) => {
              console.log("res", res);

              let formdata = new FormData();

              formdata.append(
                "dokumen_lampiran",
                this.form.value.dokumen_lampiran
              );

              this.aliranService
                .uploadDoc(formdata, res.id)
                .subscribe((resDoc) => {
                  console.log("resDoc", resDoc);

                  this.tunai_keluar = res;
                  this.dismiss();
                });
            });
          },
        },
      ],
    });

    await alert.present();
  }

  kategori_aliran: any;

  getKategoriAliran() {
    this.kategoriAliranService
      .getKategoriAliran()
      .pipe(
        map((x) =>
          x.filter(
            (i) =>
              i.jenis_aliran == "tunai_keluar" &&
              i.status_kategori_aliran == "aktif"
          )
        )
      )
      .subscribe((res) => {
        console.log("kategori aliran", res);
        this.kategori_aliran = res;
        console.log("kategori aliran", this.kategori_aliran);
      });
  }

  refresh(): void {
    window.location.reload();
  }

  file: any;
  selectedFile(event) {
    this.file = event.target.files[0];
    console.log(this.file);

    this.form.value.dokumen_lampiran = this.file;
    console.log(this.form.value.dokumen_lampiran);

    (document.getElementById("nama_fail") as HTMLIonTextElement).innerHTML =
      this.file.name;
  }
}
