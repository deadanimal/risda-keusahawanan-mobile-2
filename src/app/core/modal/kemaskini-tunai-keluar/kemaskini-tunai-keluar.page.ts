import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { KategoriAliranService } from 'src/app/services/kategoriAliran/kategori-aliran.service';
import { Router } from '@angular/router';
import { AliranService } from 'src/app/services/Aliran/aliran.service';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-kemaskini-tunai-keluar',
  templateUrl: './kemaskini-tunai-keluar.page.html',
  styleUrls: ['./kemaskini-tunai-keluar.page.scss'],
})
export class KemaskiniTunaiKeluarPage implements OnInit {

  // @Input() tunai_masuk: any;
  @Input() tunai_keluar: any;

  data: any;
  url: string;

  private form: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private kategoriAliranService: KategoriAliranService,
    private aliranService: AliranService,
    private router: Router,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {
    this.form = this.formBuilder.group({
      id_pengguna: [''],
      id_kategori_aliran: ['', Validators.required],
      tarikh_aliran: ['', Validators.required],
      keterangan_aliran: ['', Validators.required],
      jumlah_aliran: ['', Validators.required],
      nama_dokumen: [''],
      dokumen_lampiran: [''],
    });
  }
  today: any

  ngOnInit() {

    this.today = new Date();
    var dd = String(this.today.getDate()).padStart(2, '0');
    var mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = this.today.getFullYear();

    this.today = yyyy + '-' + mm + '-' + dd;
    console.log("today", this.today)


    console.log("tunai_keluar", this.tunai_keluar)

    this.url = environment.baseUrl + "storage/" + this.tunai_keluar.dokumen_lampiran;

    this.getKategoriAliran();
  }

  dismiss() {
    this.modalController.dismiss(this.tunai_keluar);
  }

  kategori_aliran_keluar: any;
  getKategoriAliran() {

    this.kategoriAliranService.getKategoriAliran().pipe(map(x => x.filter(i => i.jenis_aliran == "tunai_keluar" && i.status_kategori_aliran =="aktif"))).subscribe((res) => {
      console.log("kategori aliran", res);
      this.kategori_aliran_keluar = res;


      this.setFormValues();
    });

  }

  refresh(): void {
    window.location.reload();
  }

  setFormValues() {
    this.form.setValue({
      id_pengguna: this.tunai_keluar.id_pengguna,
      id_kategori_aliran: this.tunai_keluar.id_kategori_aliran,
      tarikh_aliran: this.tunai_keluar.tarikh_aliran,
      keterangan_aliran: this.tunai_keluar.keterangan_aliran,
      jumlah_aliran: this.tunai_keluar.jumlah_aliran,
      nama_dokumen: this.tunai_keluar.nama_dokumen,
      dokumen_lampiran: this.tunai_keluar.dokumen_lampiran,
    });

    this.form.updateValueAndValidity();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Kemaskini Berjaya',
      subHeader: 'Kemaskini Aliran Keluar Telah Berjaya',
      message: '',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Berjaya Dihapus',
      subHeader: 'Aliran Telah Berjaya Dihapus',
      message: '',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);

    this.dismiss();
    // this.refresh();
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
          }
        }, {
          text: 'Ya',
          handler: async () => {
            console.log('Confirm Okay');

            this.form.value.tarikh_aliran = moment(this.form.value.tarikh_aliran).format('YYYY-MM-DD');
            if (this.file != null) {
              this.form.value.nama_dokumen = this.file.name;
            }


            const loading = await this.loadingController.create({ message: 'Loading ...' });
            loading.present();
            console.log(this.form.value)

            this.aliranService.update(this.form.value, Number(this.tunai_keluar.id)).subscribe((res) => {
              console.log("updated data", res);

              let formdata = new FormData();

              formdata.append('dokumen_lampiran', this.file);
              this.aliranService.uploadDoc(formdata, res.id).subscribe((resDoc) => {
                console.log("resDoc", resDoc);

                this.tunai_keluar = res

                loading.dismiss();
                this.presentAlert();

                this.dismiss();
              })

            });
          }
        }
      ]
    });

    await alert.present();

  }

  async onDelete() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      message: 'Adakah anda setuju untuk memadam maklumat ini?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ya',
          handler: async () => {
            console.log('Confirm Okay');

            const loading = await this.loadingController.create({ message: 'Deleting ...' });
            loading.present();

            this.aliranService.delete(this.tunai_keluar.id).subscribe((res) => {
              console.log("deleted", res);
              loading.dismiss();
              this.presentAlert2()
            });
          }
        }
      ]
    });

    await alert.present();

  }

  file: any;
  selectedFile(event) {
    this.file = event.target.files[0];
    console.log(this.file)

    this.form.value.dokumen_lampiran = this.file;
    console.log(this.form.value.dokumen_lampiran);

    // document.getElementById("nama_fail").innerHTML(this.file)
    (document.getElementById('nama_fail') as HTMLIonTextElement).innerHTML = this.file.name;

  }





}
