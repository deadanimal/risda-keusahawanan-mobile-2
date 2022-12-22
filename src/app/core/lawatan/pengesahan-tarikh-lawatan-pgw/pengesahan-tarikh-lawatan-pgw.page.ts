import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LawatanService } from 'src/app/services/lawatan/lawatan.service';
import * as moment from 'moment';


@Component({
  selector: 'app-pengesahan-tarikh-lawatan-pgw',
  templateUrl: './pengesahan-tarikh-lawatan-pgw.page.html',
  styleUrls: ['./pengesahan-tarikh-lawatan-pgw.page.scss'],
})
export class PengesahanTarikhLawatanPgwPage implements OnInit {

  @Input() lawatan: any;

  private form: FormGroup;



  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private router: Router,
    private lawatanService: LawatanService,
  ) {
    this.form = this.formBuilder.group({
      namausahawan: ['',],
      nama_pegawai: ['',],
      tarikh_lawatan: ['', Validators.required],
      masa_lawatan: ['', Validators.required],
      status_lawatan: ['',],
      role: ['',],
      id_pegawai: ['',],
      id_pengguna: ['',],
    });
  }

  pegawai_id : any
  usahawan_id : any
  user_id : any


  ngOnInit() {

    this.pegawai_id = window.sessionStorage.getItem("pegawai_id");
    this.usahawan_id = window.sessionStorage.getItem("usahawan_id");
    this.user_id = window.sessionStorage.getItem("user_id");


    console.log(this.lawatan)

    this.setFormValues();
  }

  setFormValues() {

    this.form.patchValue({
      namausahawan: this.lawatan.namausahawan,
      nama_pegawai: this.lawatan.nama_pegawai,
      tarikh_lawatan: this.lawatan.tarikh_lawatan,
      masa_lawatan: this.lawatan.masa_lawatan,
      status_lawatan: this.lawatan.status_lawatan,
    });

    this.form.updateValueAndValidity();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async logForm() {

    // if (this.pegawai_id == null) {
    //   //usahawan
    //   this.form.value.status_lawatan = "2"
    // } else {
    //   //pegawai
    //   this.form.value.status_lawatan = "1"
    // }

    this.form.value.tarikh_lawatan = moment(this.form.value.tarikh_lawatan).format('YYYY-MM-DD');
    // this.form.value.masa_lawatan = moment(this.form.value.masa_lawatan).format('hh:mm:ss[.nnnnnnn]');


    if (this.usahawan_id != null) {
      this.form.patchValue({
        role: "usahawan",
        id_pengguna: this.lawatan.id_pengguna,
        id_pegawai: this.lawatan.id_pegawai,
        status_lawatan: 2
      });
    } else {
      this.form.patchValue({
        role: "pegawai",
        id_pengguna: this.lawatan.id_pengguna,
        id_pegawai: this.lawatan.id_pegawai,
        status_lawatan: 1
      });
    }
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

            this.lawatanService.update(this.form.value, this.lawatan.lawatan_id).subscribe((res) => {
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

  async sahkan() {

    // this.form.value.status_lawatan = "3"

    if (this.usahawan_id != null) {
      this.form.patchValue({
        role: "usahawan",
        id_pengguna: this.lawatan.id_pengguna,
        id_pegawai: this.lawatan.id_pegawai,
        status_lawatan: 3
      });
    } else {
      this.form.patchValue({
        role: "pegawai",
        id_pengguna: this.lawatan.id_pengguna,
        id_pegawai: this.lawatan.id_pegawai,
        status_lawatan: 3
      });
    }

    console.log(this.form.value)


    let tempDate = moment(this.lawatan.tarikh_lawatan).format('DD/MM/YYYY');
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      message: 'Adakah anda pasti untuk mengesahkan tarikh ' + tempDate + ' untuk sesi lawatan?',
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

            this.lawatanService.update(this.form.value, this.lawatan.lawatan_id).subscribe((res) => {
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

}
