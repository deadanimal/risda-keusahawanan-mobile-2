import { Component, OnInit } from "@angular/core";

import { LoginService } from "src/app/services/login/login.service";
import { Observable } from "rxjs";
import { LoginModel } from "src/app/services/login/login.model";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { SyarikatModel } from "src/app/services/syarikat/syarikat.model";
import { SyarikatService } from "src/app/services/syarikat/syarikat.service";
import {
  AlertController,
  LoadingController,
  PopoverController,
} from "@ionic/angular";
import * as moment from "moment";
import { PopOverPage } from "./pop-over/pop-over.page";

interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: "app-profile-syarikat",
  templateUrl: "./profile-syarikat.page.html",
  styleUrls: ["./profile-syarikat.page.scss"],
})
export class ProfileSyarikatPage implements OnInit {
  form: FormGroup;

  jenis_milikan = [
    { id: "JPP01", name: "PEMILIKAN TUNGGAL" },
    { id: "JPP02", name: "PERKONGSIAN" },
    { id: "JPP03", name: "SYARIKAT SDN BHD" },
    { id: "JPP04", name: "PERKONGSIAN LIABILITI TERHAD" },
  ];

  constructor(
    private syarikatService: SyarikatService,
    private loginService: LoginService,
    private router: Router,
    private syarikat: SyarikatModel,
    public alertController: AlertController,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private popoverCtrl: PopoverController
  ) {
    this.form = this.formBuilder.group({
      id: [""],
      usahawanid: [""],
      Kod_PT: [""],
      logo_syarikat: [""],
      namasyarikat: ["", Validators.required],
      jenismilikanperniagaan: ["", Validators.required],
      nodaftarssm: [""],
      nodaftarpbt: [""],
      nodaftarpersijilanhalal: [""],
      nodaftarmesti: [""],
      tahunmulaoperasi: ["", Validators.required],
      bilanganpekerja: ["", Validators.required],
      alamat1_ssm: ["", Validators.required],
      alamat2_ssm: ["", Validators.required],
      alamat3_ssm: ["", Validators.required],
      tarikh_mula_mof: [""],
      tarikh_tamat_mof: [""],
      status_bumiputera: ["", Validators.required],
      prefix_id: ["", Validators.required],
      notelefon: [""],
      nama_akaun_bank: ["", Validators.required],
      no_akaun_bank: ["", Validators.required],
      no_hp: [""],
      email: ["", Validators.required],
    });
  }

  usahawan_id: any;
  user_id: any;

  ngOnInit() {
    this.usahawan_id = window.sessionStorage.getItem("usahawan_id");
    this.user_id = window.sessionStorage.getItem("user_id");

    console.log("usahawan id", this.usahawan_id);
    console.log("user id", this.user_id);

    this.getSyarikat();
  }

  async getSyarikat() {
    const loading = await this.loadingController.create({
      message: "Loading ...",
    });
    loading.present();
    // console.log(this.form.value);
    this.syarikatService.show(this.usahawan_id).subscribe((res) => {
      console.log("syarikat info", res);

      if (Object.keys(res).length === 0) {
        console.log("failed");
        loading.dismiss();
      } else {
        this.syarikat = res;

        console.log("profile syarikat success");
        this.setFormValues();
        loading.dismiss();
      }
    });
  }

  setFormValues() {
    this.form.setValue({
      id: this.syarikat.syarikat_id,
      usahawanid: this.syarikat.usahawanid,
      Kod_PT: this.syarikat.Kod_PT,
      logo_syarikat: this.syarikat.logo_syarikat,
      namasyarikat: this.syarikat.namasyarikat,
      jenismilikanperniagaan: this.syarikat.jenismilikanperniagaan,
      nodaftarssm: this.syarikat.nodaftarssm,
      nodaftarpbt: this.syarikat.nodaftarpbt,
      nodaftarpersijilanhalal: this.syarikat.nodaftarpersijilanhalal,
      nodaftarmesti: this.syarikat.nodaftarmesti,
      tahunmulaoperasi: this.syarikat.tahunmulaoperasi,
      bilanganpekerja: this.syarikat.bilanganpekerja,
      alamat1_ssm: this.syarikat.alamat1_ssm,
      alamat2_ssm: this.syarikat.alamat2_ssm,
      alamat3_ssm: this.syarikat.alamat3_ssm,
      tarikh_mula_mof: this.syarikat.tarikh_mula_mof,
      tarikh_tamat_mof: this.syarikat.tarikh_tamat_mof,
      status_bumiputera: this.syarikat.status_bumiputera,
      prefix_id: this.syarikat.prefix_id,
      nama_akaun_bank: this.syarikat.nama_akaun_bank,
      no_akaun_bank: this.syarikat.no_akaun_bank,
      notelefon: this.syarikat.notelefon,
      no_hp: this.syarikat.no_hp,
      email: this.syarikat.email,
    });
  }

  async logForm() {
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
            this.setFormValues();
          },
        },
        {
          text: "Ya",
          handler: async () => {
            console.log("Confirm Okay");

            const loading = await this.loadingController.create({
              message: "Loading ...",
            });
            loading.present();

            this.form.value.logo_syarikat = this.syarikat.logo_syarikat;
            // this.form.value.tahunmulaoperasi = moment(this.form.value.tahunmulaoperasi).format('YYYY');

            this.form.value.tarikh_mula_mof = moment(
              this.form.value.tarikh_mula_mof
            ).format("YYYY-MM-DD");
            this.form.value.tarikh_tamat_mof = moment(
              this.form.value.tarikh_tamat_mof
            ).format("YYYY-MM-DD");

            console.log(this.form.value);
            // console.log(this.form.value)

            this.syarikatService
              .update(this.form.value, this.usahawan_id)
              .subscribe((res) => {
                console.log("updated data", res);

                loading.dismiss();

                this.getSyarikat();

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
      subHeader: "Kemaskini Maklumat Syarikat Telah Berjaya",
      message: "",
      buttons: ["OK"],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log("onDidDismiss resolved with role", role);
  }

  url: any;
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.url = event.target.result;
        this.syarikat.logo_syarikat = this.url;
      };

      this.fileEvent(event);
    }
  }

  // Convert the base64 to blob data
  // and create  formData with it

  images: LocalFile[];
  async fileEvent(e) {
    this.images = [];

    const files = e.target.files;
    const file = files[0];
    const filePath = files[0].size;
    const base64Data = await this.readAsBase64(file);

    const fileName = new Date().getTime() + ".jpeg";

    this.images.push({
      name: fileName,
      path: filePath,
      data: `${base64Data}`,
    });

    console.log("AAAA", this.images);
  }

  // https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
  private async readAsBase64(blob) {
    // Fetch the photo, read as a blob, then convert to base64 format
    // const response = await fetch(photo.webPath);
    // const blob = await response.blob();

    return (await this.convertBlobToBase64(blob)) as string;
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  async openPopOver(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: PopOverPage,
      event: ev,
      cssClass: "sustom-popover",
    });

    await popover.present();
  }

  back() {
    this.router.navigate(["/profile"]);
  }
}
