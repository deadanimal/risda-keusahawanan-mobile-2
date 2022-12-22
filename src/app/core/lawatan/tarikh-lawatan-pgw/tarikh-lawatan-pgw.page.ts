import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { LawatanService } from 'src/app/services/lawatan/lawatan.service';
import { CarianUsahawanPage } from '../carian-usahawan/carian-usahawan.page';

@Component({
  selector: 'app-tarikh-lawatan-pgw',
  templateUrl: './tarikh-lawatan-pgw.page.html',
  styleUrls: ['./tarikh-lawatan-pgw.page.scss'],
})
export class TarikhLawatanPgwPage implements OnInit {

  private form: FormGroup;

  usahawan_id : any
  pegawai_id : any
  user_id : any

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private router: Router,
    private lawatanService: LawatanService,
    public alertController: AlertController
  ) {
    this.form = this.formBuilder.group({
      id_pengguna: ['', Validators.required],
      id_pegawai: ['',],
      tarikh_lawatan: ['', Validators.required],
      masa_lawatan: ['', Validators.required],

    });
  }

  ngOnInit() {

    this.usahawan_id = window.sessionStorage.getItem("usahawan_id");
    this.pegawai_id = window.sessionStorage.getItem("pegawai_id");
    this.user_id = window.sessionStorage.getItem("user_id");


    this.getSenaraiUsahawan();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async logForm() {

    this.form.value.tarikh_lawatan = moment(this.form.value.tarikh_lawatan).format('YYYY-MM-DD');
    this.form.value.masa_lawatan = moment(this.form.value.masa_lawatan).format('HH:mm');

    this.form.value.id_pegawai = this.pegawai_id;

    console.log(this.form.value)

    let tempDate = moment(this.form.value.tarikh_lawatan).format('DD/MM/YYYY');

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      message: 'Adakah anda pasti untuk mencadangkan tarikh ' + tempDate + ' untuk sesi lawatan?',
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
          handler: () => {
            console.log('Confirm Okay');

            this.lawatanService.post(this.form.value).subscribe((res) => {
              console.log("res", res);

              this.dismiss();

              window.location.reload();
            });
          }
        }
      ]
    });

    await alert.present();


  }

  usahawan: any;
  getSenaraiUsahawan() {
    this.lawatanService.getsenaraiusahawan(this.pegawai_id).subscribe((res) => {
      console.log("usahawan", res);
      this.usahawan = res;

    });
  }


  tempID: any = null

  async openSenaraiUsahawan() {

    console.log("AAAAAA", this.usahawan)

    let usahawans = this.usahawan;
    const modal = await this.modalController.create({
      component: CarianUsahawanPage,
      cssClass: 'my-custom-class',
      componentProps: { usahawans }
    });
    await modal.present();

    const { data: usahawan } = await modal.onDidDismiss();
    if (usahawan >0) {
      console.log("yeayyy", usahawan)

      this.tempID = usahawan

      console.log("AAAAAA", this.tempID)

      this.form.patchValue({
        id_pengguna: usahawan
      })
    } else {

      console.log("AAAAAA", this.tempID)
      this.tempID == null
    }
  }

}
