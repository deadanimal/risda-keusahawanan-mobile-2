import { Component, OnInit } from "@angular/core";
import {
  AlertController,
  ModalController,
  PopoverController,
} from "@ionic/angular";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Validators } from "@angular/forms";
import { PelangganService } from "src/app/services/pelanggan/pelanggan.service";
import { StokService } from "src/app/services/stok/stok.service";
import { DaerahService } from "src/app/services/daerah/daerah.service";
import { map } from "rxjs/operators";
import { NegeriService } from "src/app/services/negeri/negeri.service";
import { KatalogService } from "src/app/services/katalog/katalog.service";
import { TooltipPage } from "../tooltip/tooltip.page";

@Component({
  selector: "app-tambah-jana-dokumen",
  templateUrl: "./tambah-jana-dokumen.page.html",
  styleUrls: ["./tambah-jana-dokumen.page.scss"],
})
export class TambahJanaDokumenPage implements OnInit {
  form1: FormGroup;
  private form2: FormGroup;
  authForm: FormGroup;

  // variable

  negeri: any;
  daerah: any;

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private pelangganService: PelangganService,
    public alertController: AlertController,
    public stokService: StokService,
    private daerahService: DaerahService,
    private negeriService: NegeriService,
    private katalogService: KatalogService,
    private popoverCtrl: PopoverController
  ) {
    this.form1 = this.formBuilder.group({
      tajuk: ["", Validators.required],

      nama_pelanggan: ["", Validators.required],
      alamat1: ["", Validators.required],
      alamat2: ["", Validators.required],
      alamat3: ["", Validators.required],
      poskod: ["", Validators.required],
      U_Negeri_ID: ["", Validators.required],
      U_Daerah_ID: ["", Validators.required],
      no_telefon: ["", Validators.required],
      no_fax: [""],

      diskaun: [""],
      kos_penghantaran: [""],
      cukai_sst: [""],

      produk: this.formBuilder.array([]),
    });
  }

  count: any = 0;
  productLength: any = 0;
  addProduk() {
    const produk = this.formBuilder.group({
      id_katalog: ["", Validators.required],
      id_pelanggan: [""],
      stok_dijual: ["", Validators.required],
      modified_by: [""],
    });
    this.getProdukArray.push(produk);

    this.count++;
    this.productLength = this.getProdukArray.length;
    console.log("this.productLength", this.productLength);
    console.log("After Add: ", this.form1.value);
  }

  get getProdukArray() {
    return <FormArray>this.form1.get("produk");
  }

  deleteProduk(i) {
    this.getProdukArray.removeAt(i);

    this.count--;
    this.productLength = this.getProdukArray.length;
  }

  usahawan_id: any;
  user_id: any;

  ngOnInit() {
    this.usahawan_id = window.sessionStorage.getItem("usahawan_id");
    this.user_id = window.sessionStorage.getItem("user_id");

    this.getNegeri();
    // this.getDaerah();
    this.getKatalog();

    this.addProduk();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
    // window.location.reload();
  }

  async logForm() {
    console.log(this.form1.value);

    let prodTemp = this.form1.value.produk;
    let prodTempLength = prodTemp.length;

    console.log("prodTemp", prodTemp[1]);

    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "",
      message: "Adakah anda pasti mahu menyimpan maklumat ini?",
      buttons: [
        {
          text: "Tidak",
          role: "cancel",
          cssClass: "secondary",
          id: "cancel-button",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Ya",
          id: "confirm-button",
          handler: () => {
            console.log("Confirm Okay");

            this.pelangganService.post(this.form1.value).subscribe((res) => {
              console.log("res pelanggan", res);

              let pelanggan = res;

              for (let i = 0; i < prodTempLength; i++) {
                prodTemp[i].id_pelanggan = pelanggan.id;
                prodTemp[i].modified_by = this.user_id;

                this.stokService.post(prodTemp[i]).subscribe((res) => {
                  console.log("res stok", res);
                });
              }

              this.presentAlert();
            });
          },
        },
      ],
    });

    await alert.present();
  }

  getNegeri() {
    this.negeriService.get().subscribe((res) => {
      console.log("negeri", res);
      this.negeri = res;

    });
  }

  getDaerah(event) {
    // console.log("test")
    // console.log(this.form1.value.U_Negeri_ID)

    this.daerahService
      .get()
      .pipe(
        map((x) =>
          x.filter((i) => i.U_Negeri_ID == this.form1.value.U_Negeri_ID)
        )
      )
      .subscribe((res) => {
        // this.daerahService.get().subscribe((res) => {

        console.log("Daerah", res);
        this.daerah = res;
      });
  }

  katalog: any;
  getKatalog() {
    console.log("this.user_id", this.user_id);

    this.katalogService.get(this.user_id).subscribe((res) => {
      console.log("katalog", res);

      this.katalog = res;
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Berjaya",
      subHeader: "Maklumat pelanggan telah berjaya disimpan",
      message: "",
      buttons: ["OK"],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log("onDidDismiss resolved with role", role);

    this.dismiss();
    this.refresh();
  }

  refresh(): void {
    window.location.reload();
  }

  numericOnly(event): boolean {
    // console.log(event.key)
    let pattern = /^([0-9])$/;
    let result = pattern.test(event.key);
    return result;
  }

  async openPopOver(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: TooltipPage,
      event: ev,
      cssClass: "sustom-popover",
    });

    await popover.present();
  }
}
