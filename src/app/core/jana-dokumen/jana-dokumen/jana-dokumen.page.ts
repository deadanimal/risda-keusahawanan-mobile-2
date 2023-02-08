import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSelect, LoadingController, ModalController } from '@ionic/angular';
import { PelangganService } from 'src/app/services/pelanggan/pelanggan.service';
import { environment } from 'src/environments/environment';
import { KemaskiniDokumenPage } from '../kemaskini-dokumen/kemaskini-dokumen.page';
import { TambahJanaDokumenPage } from '../tambah-jana-dokumen/tambah-jana-dokumen.page';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Router } from '@angular/router';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { HttpClient } from '@angular/common/http';
import { FileDownloadModalComponent } from 'src/app/shared/file-download-modal/file-download-modal.component';
import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-jana-dokumen',
  templateUrl: './jana-dokumen.page.html',
  styleUrls: ['./jana-dokumen.page.scss'],
})
export class JanaDokumenPage implements OnInit {

  hideList = true;

  @ViewChild('jenisDoc') docSelectRef: IonSelect;

  usahawan_id: any
  user_id: any

  displayCountry() {
    this.docSelectRef.open();
  }

  constructor(
    public modalController: ModalController,
    private pelangganService: PelangganService,
    private loadingController: LoadingController,
    private iab: InAppBrowser,
    private router: Router,
    private transfer: FileTransfer,
    private file: File,
    private http: HttpClient,

  ) { }

  ngOnInit() {
    this.usahawan_id = window.sessionStorage.getItem("usahawan_id");
    this.user_id = window.sessionStorage.getItem("user_id");

    this.getPelanggan();
  }

  pelanggan: any


  async tambahDokumen() {
    console.log("Tambah Dokumen");
    const modal = await this.modalController.create({
      component: TambahJanaDokumenPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async kemaskiniDokumen(pelanggan: any) {
    console.log("kemaskini Dokumen");
    const modal = await this.modalController.create({
      component: KemaskiniDokumenPage,
      componentProps: { pelanggan },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async getPelanggan() {

    const loading = await this.loadingController.create({ message: 'Loading ...' });
    loading.present();

    this.pelangganService.get(this.user_id).subscribe((res) => {
      console.log("res pelanggan", res);

      this.pelanggan = res;

      loading.dismiss();
    });
  }


  jenisDokumen: any;
  jana_Dokumen(id_pelanggan) {

    this.presentLoading()

    console.log(id_pelanggan);
    console.log("jenisDokumen", this.jenisDokumen);

    let formdata = new FormData();

    formdata.append('id_pengguna', this.user_id);


    if (this.jenisDokumen == 1) {
      this.pelangganService.janaDokumen(id_pelanggan, formdata).subscribe((res) => {
        console.log("res3", res);

        let url = environment.baseUrl + 'storage/' + res;

        console.log(url);
        // window.open(url, "_blank");
        this.loadingController.dismiss();
        this.presentModal(url);



      });
    } else if (this.jenisDokumen == 2) {
      this.pelangganService.janaQuotation(id_pelanggan, formdata).subscribe((res) => {
        console.log("res3", res);

        let url = environment.baseUrl + 'storage/' + res;

        console.log(url);
        // window.open(url, "_blank");
        // const browser = this.iab.create(url, '_system');
        this.loadingController.dismiss();
        this.presentModal(url);



      });

    } else if (this.jenisDokumen == 3) {
      this.pelangganService.janaDO(id_pelanggan, formdata).subscribe((res) => {
        console.log("res3", res);

        let url = environment.baseUrl + 'storage/' + res;

        console.log(url);
        // window.open(url, "_blank");
        // const browser = this.iab.create(url, '_system');

        this.loadingController.dismiss();
        this.presentModal(url);



      });

    } else if (this.jenisDokumen == 4) {
      this.pelangganService.janaInvoice(id_pelanggan, formdata).subscribe((res) => {
        console.log("res3", res);

        let url = environment.baseUrl + 'storage/' + res;

        console.log(url);
        // window.open(url, "_blank");
        // const browser = this.iab.create(url, '_system');s
        this.loadingController.dismiss();

        this.presentModal(url);


      });
    }

  }

  dashboard() {
    this.router.navigate(['/dashboard'])
  }

  async presentModal(url: string) {
    const modal = await this.modalController.create({
      component: FileDownloadModalComponent,
      componentProps: { value: 123, url: url },
    });

    await modal.present();
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Loading ...",
      duration: 2000,
      spinner: "bubbles",
    });
    await loading.present();
  }

}


