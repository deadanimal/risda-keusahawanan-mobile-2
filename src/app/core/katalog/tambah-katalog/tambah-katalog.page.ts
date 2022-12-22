import { Component, OnInit } from "@angular/core";
import {
  AlertController,
  LoadingController,
  ModalController,
} from "@ionic/angular";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { KatalogService } from "src/app/services/katalog/katalog.service";

interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: "app-tambah-katalog",
  templateUrl: "./tambah-katalog.page.html",
  styleUrls: ["./tambah-katalog.page.scss"],
})
export class TambahKatalogPage implements OnInit {
  private form: FormGroup;

  usahawan_id: any;
  user_id: any;
  gambar: File;

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private katalogService: KatalogService,
    private loadingController: LoadingController,
    public alertController: AlertController
  ) {
    this.form = this.formBuilder.group({
      id_pengguna: [""],
      nama_produk: ["", Validators.required],
      kandungan_produk: ["", Validators.required],
      harga_produk: ["", Validators.required],
      berat_produk: ["", Validators.required],
      keterangan_produk: ["", Validators.required],

      gambar_url: ["", Validators.required],
      baki_stok: [""],
      unit_production: ["", Validators.required],
      status_katalog: ["", Validators.required],
      // disahkan_oleh: ['', Validators.required],
      modified_by: [""],
    });
  }

  ngOnInit() {
    this.usahawan_id = window.sessionStorage.getItem("usahawan_id");
    this.user_id = window.sessionStorage.getItem("user_id");

    this.images = [];
  }

  dismiss(refresh: boolean) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
      refresh,
    });
  }

  async logForm() {
    this.form.value.gambar_url = this.images[0].data;

    let temp = this.form.value.nama_produk.toUpperCase();
    let temp2 = this.form.value.kandungan_produk.toUpperCase();

    this.form.value.nama_produk = temp;
    this.form.value.kandungan_produk = temp2;

    console.log(this.form.value);

    const loading = await this.loadingController.create({
      message: "Loading ...",
    });
    loading.present();

    this.katalogService.post(this.form.value, this.gambar).subscribe((res) => {
      console.log("res", res);

      loading.dismiss();
      this.dismiss(true);
      // window.location.reload();
    });
  }

  updateBakiStok() {
    this.form.setValue({
      id_pengguna: this.user_id,
      nama_produk: this.form.value.nama_produk,
      kandungan_produk: this.form.value.kandungan_produk,
      harga_produk: this.form.value.harga_produk,
      berat_produk: this.form.value.berat_produk,
      keterangan_produk: this.form.value.keterangan_produk,

      baki_stok: this.form.value.unit_production,
      unit_production: this.form.value.unit_production,

      status_katalog: this.form.value.status_katalog,
      gambar_url: this.form.value.gambar_url,
      modified_by: this.user_id,
    });
  }

  url: any = "assets/icon/image-not-available.png";
  onSelectFile(event) {
    this.gambar = event.target.files[0];
    const test = event.target.files[0];
    console.log("size", test.size);
    console.log("type", test.type);

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.url = event.target.result;
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
    // const base64Data = await this.readAsBase64(file);

    const fileName = new Date().getTime() + ".jpeg";

    this.images.push({
      name: fileName,
      path: filePath,

      data: files.item(0),
    });

    console.log("AAAA", this.images);

    this.form.patchValue({
      gambar_url: this.images[0].data,
    });
  }

  // https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
  // private async readAsBase64(blob) {
  //   // Fetch the photo, read as a blob, then convert to base64 format
  //   // const response = await fetch(photo.webPath);
  //   // const blob = await response.blob();

  //   // return (await this.convertBlobToBase64(blob)) as string;
  // }

  // convertBlobToBase64 = (blob: Blob) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onerror = reject;
  //     reader.onload = () => {
  //       resolve(reader.result);
  //     };
  //     reader.readAsDataURL(blob);
  //   });

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Ralat",
      subHeader: "Saiz Gambar tidak boleh melebihi 1MB",
      message: "",
      buttons: ["OK"],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log("onDidDismiss resolved with role", role);
  }
}
