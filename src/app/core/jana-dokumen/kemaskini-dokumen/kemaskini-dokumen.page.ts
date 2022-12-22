import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DaerahService } from 'src/app/services/daerah/daerah.service';
import { NegeriService } from 'src/app/services/negeri/negeri.service';
import { KatalogService } from 'src/app/services/katalog/katalog.service';
import { map } from 'rxjs/operators';
import { StokService } from 'src/app/services/stok/stok.service';
import { PelangganService } from 'src/app/services/pelanggan/pelanggan.service';
import { TooltipPage } from '../tooltip/tooltip.page';

@Component({
  selector: 'app-kemaskini-dokumen',
  templateUrl: './kemaskini-dokumen.page.html',
  styleUrls: ['./kemaskini-dokumen.page.scss'],
})
export class KemaskiniDokumenPage implements OnInit {


  @Input() pelanggan: any;

  private form: FormGroup;



  // variable

  negeri: any;
  daerah: any;

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private daerahService: DaerahService,
    private negeriService: NegeriService,
    private katalogService: KatalogService,
    private stokService: StokService,
    private pelangganService: PelangganService,
    private popoverCtrl: PopoverController
  ) {
    this.form = this.formBuilder.group({
      tajuk: ['', Validators.required],
      nama_pelanggan: ['', Validators.required],
      alamat1: ['', Validators.required],
      alamat2: ['', Validators.required],
      alamat3: ['', Validators.required],
      poskod: ['', Validators.required],
      U_Negeri_ID: ['', Validators.required],
      U_Daerah_ID: ['', Validators.required],
      no_telefon: ['', Validators.required],
      no_fax: ['',],

      diskaun: ['',],
      kos_penghantaran: ['',],
      cukai_sst: ['',],

      produk: this.formBuilder.array([]),
    });
  }

  count: any = 0;
  productLength: any = 0;
  addProduk() {

    const produk = this.formBuilder.group({
      id: ['',],
      id_katalog: ['', Validators.required],
      id_pelanggan: [''],
      stok_dijual: ['', Validators.required],
      modified_by: [''],
    });
    this.getProdukArray.push(produk);

    this.count++;
    this.productLength = this.getProdukArray.length;
    console.log("this.productLength", this.productLength)
    console.log('After Add: ', this.form.value);
  }

  get getProdukArray() {
    return (<FormArray>this.form.get('produk'));
  }

  deleteProduk(i, produk) {
    console.log(produk);
    this.getProdukArray.removeAt(i);

    this.count--;
    this.productLength = this.getProdukArray.length;
    console.log("this.productLength", this.productLength)
    console.log('After Add: ', this.form.value);

    if (produk != '') {
      this.stokService.delete(produk).subscribe((res) => {
        console.log("deleted stok", res);

      });
    }

  }

  usahawan_id: any
  user_id: any


  ngOnInit() {

    this.usahawan_id = window.sessionStorage.getItem("usahawan_id");
    this.user_id = window.sessionStorage.getItem("user_id");

    console.log(this.pelanggan);

    this.getNegeri();
    this.getKatalog();
    this.getDaerah(this.pelanggan.U_Negeri_ID);
    this.getStok(this.pelanggan.id_pelanggan);

  }

  setFormValues() {

    this.form.patchValue({
      tajuk: this.pelanggan.tajuk,
      nama_pelanggan: this.pelanggan.nama_pelanggan,
      alamat1: this.pelanggan.alamat1,
      alamat2: this.pelanggan.alamat2,
      alamat3: this.pelanggan.alamat3,
      poskod: this.pelanggan.poskod,
      U_Negeri_ID: this.pelanggan.U_Negeri_ID,
      U_Daerah_ID: this.pelanggan.U_Daerah_ID,
      no_telefon: this.pelanggan.no_telefon,
      no_fax: this.pelanggan.no_fax,

      diskaun: this.pelanggan.diskaun,
      kos_penghantaran: this.pelanggan.kos_penghantaran,
      cukai_sst: this.pelanggan.cukai_sst,
    });

    this.form.updateValueAndValidity();
  }

  setProdukVAlue() {

    this.stok.forEach(element => {
      const produk = this.formBuilder.group({
        id: element.id,
        id_katalog: element.id_katalog,
        id_pelanggan: element.id_pelanggan,
        stok_dijual: element.stok_dijual,
        modified_by: element.modified_by,
      });
      this.getProdukArray.push(produk);

      this.count++;
      this.productLength = this.getProdukArray.length;
      console.log("this.productLength", this.productLength)
      console.log('After Add: ', this.form.value);
    });
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
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
          }
        }, {
          text: 'Ya',
          handler: () => {
            console.log('Confirm Okay');

            console.log(this.form.value)

            let prodTemp = this.form.value.produk;
            let prodTempLength = prodTemp.length;

            console.log("prodTemp", prodTemp[1])

            this.pelangganService.update(this.form.value, this.pelanggan.id).subscribe((res) => {
              console.log("res pelanggan", res);

              let pelanggan = res;

              for (let i = 0; i < prodTempLength; i++) {

                prodTemp[i].id_pelanggan = pelanggan.id;
                prodTemp[i].modified_by = this.user_id;

                console.log(prodTemp[i]);

                if (prodTemp[i].id == '') {
                  this.stokService.post(prodTemp[i]).subscribe((res) => {
                    console.log("res stok", res);

                  });
                } else {
                  this.stokService.update(prodTemp[i], prodTemp[i].id).subscribe((res) => {
                    console.log("res stok", res);

                  });
                }

              }

              // this.dismiss();
              this.presentAlert()

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

            this.pelangganService.delete(this.pelanggan.id_pelanggan).subscribe((res) => {
              console.log("deleted", res);

              this.stokService.deleteMany(this.pelanggan.id_pelanggan).subscribe((res) => {
                console.log("deleted stok", res);


                loading.dismiss();
                this.presentAlert2()
              });
            });
          }
        }
      ]
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

    this.daerahService.get().pipe(map(x => x.filter(i => i.U_Negeri_ID == this.form.value.U_Negeri_ID))).subscribe((res) => {
      // this.daerahService.get().subscribe((res) => {

      console.log("Daerah", res);
      this.daerah = res;

      this.setFormValues();
    });

  }

  katalog: any;
  getKatalog() {
    console.log("this.user_id", this.user_id);

    this.katalogService.get(this.user_id).subscribe((res) => {
      console.log("katalog", res);

      this.katalog = res

    });

  }

  stok: any;
  getStok(id) {
    this.stokService.get(this.pelanggan.id_pelanggan).subscribe((res) => {
      console.log("stok", res);
      this.stok = res;

      this.setProdukVAlue();
    });

  }


  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Berjaya',
      subHeader: 'Maklumat pelanggan telah berjaya dikemaskini',
      message: '',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);

    this.dismiss();
    this.refresh();
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Berjaya Dihapus',
      subHeader: 'Maklumat Pelanggan Telah Berjaya Dihapus',
      message: '',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);

    this.dismiss();
    this.refresh();
  }

  async presentAlertConfirmDelete() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Maklumat akan dihapus!',
      message: 'Adakah anda pasti?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ya',
          handler: () => {
            console.log('Confirm Okay');
            // console.log(i);
            this.onDelete();
          }
        }
      ]
    });

    await alert.present();
  }



  refresh(): void {
    window.location.reload();
  }


  numericOnly(event): boolean {
    let pattern = /^([0-9])$/;
    let result = pattern.test(event.key);
    return result;
  }

  async openPopOver(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: TooltipPage,
      event: ev,
      cssClass: 'sustom-popover'
    });

    await popover.present();
  }
}
