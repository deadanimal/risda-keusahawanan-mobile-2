import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { BuletinService } from 'src/app/services/buletin/buletin.service';
import * as moment from 'moment';


interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-tambah-buletin',
  templateUrl: './tambah-buletin.page.html',
  styleUrls: ['./tambah-buletin.page.scss'],
})
export class TambahBuletinPage implements OnInit {

  private form: FormGroup;



  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private buletinService: BuletinService,
    public alertController: AlertController,
    public loadingController: LoadingController,

  ) {
    this.form = this.formBuilder.group({
      id_pegawai: ['',],
      tajuk: ['', Validators.required],
      tarikh: ['', Validators.required],
      keterangan_lain: ['', Validators.required],
      status: ['', Validators.required],
      gambar_buletin: ['', Validators.required],
      url: ['',],
    });
  }

  pegawai_id: any
  user_id: any

  ngOnInit() {

    this.pegawai_id = window.sessionStorage.getItem("pegawai_id");
    this.user_id = window.sessionStorage.getItem("user_id");


    this.images = [];
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async logForm() {


    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      message: 'Adakah anda pasti mahu menambah berita?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ya',
          id: 'confirm-button',
          handler: async () => {
            console.log('Confirm Okay');

            const loading = await this.loadingController.create({ message: 'Loading ...' });
            loading.present();

            this.form.value.id_pegawai = this.pegawai_id;
            this.form.value.gambar_buletin = this.images[0].data;

            this.form.value.tarikh = moment(this.form.value.tarikh).format('YYYY-MM-DD');

            console.log(this.form.value)

            this.buletinService.post(this.form.value).subscribe((res) => {
              console.log("res", res);

              loading.dismiss();
              this.dismiss();
              window.location.reload();
            });
          }
        }
      ]
    });

    await alert.present();

  }


  url: any = 'assets/icon/image-not-available.png';
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }

      this.fileEvent(event);
    }
  }


  // Convert the base64 to blob data
  // and create  formData with it

  images: LocalFile[];
  async fileEvent(e) {

    this.images = []

    const files = e.target.files;
    const file = files[0];
    const filePath = files[0].size;
    const base64Data = await this.readAsBase64(file);

    const fileName = new Date().getTime() + '.jpeg';

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


}
