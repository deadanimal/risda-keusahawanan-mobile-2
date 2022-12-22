import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LawatanService } from 'src/app/services/lawatan/lawatan.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { KatalogService } from 'src/app/services/katalog/katalog.service';
import * as moment from 'moment';
import { Pipe, PipeTransform } from '@angular/core';
// @Pipe({name: 'convertFrom24To12Format'})
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';


interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-kemaskini-laporan',
  templateUrl: './kemaskini-laporan.page.html',
  styleUrls: ['./kemaskini-laporan.page.scss'],
})
export class KemaskiniLaporanPage implements OnInit {

  @Input() laporan: any;


  url: any;

  private form: FormGroup;

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private lawatanService: LawatanService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private iab: InAppBrowser

  ) {
    this.form = this.formBuilder.group({
      namausahawan: ['', Validators.required],
      tarikh_lawatan: [''],
      masa_lawatan: [''],
      id_tindakan_lawatan: ['', Validators.required],
      komen: ['', ],
      jenis_lawatan: ['', Validators.required],
      gambar_lawatan: ['',],
    });
  }

  ngOnInit() {
    console.log("laporan", this.laporan);

    if (this.laporan.gambar_lawatan == null) {
      this.url = 'assets/icon/image-not-available.png';
    } else {
      this.url = this.laporan.gambar_lawatan;
    }


    this.getTindakanLawatan();
  }

  setFormValues() {

    let hour = (this.laporan.masa_lawatan.split(':'))[0]
    let min = (this.laporan.masa_lawatan.split(':'))[1]
    let part = hour > 12 ? 'pm' : 'am';
    if(parseInt(hour) == 0)
     hour = 12;
    min = (min+'').length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour+'').length == 1 ? `0${hour}` : hour;
    let masa = `${hour}:${min} ${part}`

    this.form.patchValue({
      namausahawan: this.laporan.namausahawan,
      tarikh_lawatan: moment(this.laporan.tarikh_lawatan).format('DD/MM/YYYY'),
      masa_lawatan: masa,
      id_tindakan_lawatan: this.laporan.id_tindakan_lawatan,
      komen: this.laporan.komen,
      jenis_lawatan: this.laporan.jenis_lawatan,
      // gambar_lawatan: this.laporan.gambar_lawatan,
    });

    if (this.laporan.jenis_lawatan == null){
      this.form.patchValue({
        jenis_lawatan: "janji temu"
      });
    }

    this.form.updateValueAndValidity();
  }

  
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  tindakanLawatan: any;
  getTindakanLawatan() {
    this.lawatanService.getTindakanLawatan().pipe(map(x => x.filter(i => i.status_tindakan_lawatan == "aktif"))).subscribe((res) => {
      console.log("tindakan lawatan", res);

      this.tindakanLawatan = res;

      this.setFormValues();
    });
  }

  async logForm() {


    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      message: 'Adakah anda setuju untuk menyimpan perubahan ini?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.setFormValues()
          }
        }, {
          text: 'Ya',
          handler: async () => {

            if (this.images.length > 0) {
              this.form.value.gambar_lawatan = this.images[0].data;
            } else {
              this.form.value.gambar_lawatan = this.laporan.gambar_lawatan;
            }
        
            console.log(this.form.value.gambar_url)
        
            this.lawatanService.updateLaporan(this.form.value, this.laporan.lawatan_id).subscribe((res) => {
              console.log("updated", res);
        
              this.dismiss();
              window.location.reload();
            });
            
          }
        }
      ]
    });

    await alert.present();

  }


  //image
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

  images: LocalFile[] = [];
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



  download_laporan(id) {

    console.log(id);
    this.lawatanService.janaLaporan(id).subscribe((res) => {
      console.log("res3", res);

      let url = environment.baseUrl + 'storage/' + res;

      console.log(url);
      // window.open(url, "_blank");
      const browser = this.iab.create(url, '_system');


    });
  }


}
