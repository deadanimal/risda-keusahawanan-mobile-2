import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LawatanService } from 'src/app/services/lawatan/lawatan.service';
import { map } from 'rxjs/operators';
import { NegeriService } from 'src/app/services/negeri/negeri.service';
import { PusatTanggungjawabService } from 'src/app/services/pusat-tanggungjawab/pusat-tanggungjawab.service';
import { UsahawanService } from 'src/app/services/usahawan/usahawan.service';
import * as moment from 'moment';
import { CarianUsahawanPage } from '../carian-usahawan/carian-usahawan.page';


interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-tambah-laporan',
  templateUrl: './tambah-laporan.page.html',
  styleUrls: ['./tambah-laporan.page.scss'],
})
export class TambahLaporanPage implements OnInit {

  @Input() laporan: any;



  url: any = "assets/icon/image-not-available.png";

  private form: FormGroup;
  negeri: any;

  negeriValue: any = null;
  ptValue: any = null;

  pt: any;
  usahawan: any[];


  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private lawatanService: LawatanService,
    private negeriService: NegeriService,
    private ptService: PusatTanggungjawabService,
    private usahawanService: UsahawanService,
    private loadingController: LoadingController,
  ) {
    this.form = this.formBuilder.group({
      // negeri: ['', Validators.required],
      // pt: ['', Validators.required],
      id_pegawai: ['',],
      id_pengguna: ['', Validators.required],
      tarikh_lawatan: ['', Validators.required],
      masa_lawatan: ['', Validators.required],
      id_tindakan_lawatan: ['', Validators.required],
      komen: ['',],
      jenis_lawatan: ['', Validators.required],
      gambar_lawatan: ['',],
    });
  }

  pegawai_id: any
  peranan_pegawai: any

  ngOnInit() {
    this.pegawai_id = window.sessionStorage.getItem("pegawai_id");
    this.peranan_pegawai = window.sessionStorage.getItem("peranan_pegawai");

    console.log("peranan", this.peranan_pegawai);
    console.log("laporan", this.laporan);


    if (this.peranan_pegawai == "1" || this.peranan_pegawai == "2") {
      this.getNegeri();
      this.getPT()
      this.getTindakanLawatan();

      this.form.patchValue({
        jenis_lawatan: "datang terus"
      })
    } else {

      this.getNegeriPt()
      this.getTindakanLawatan();

      this.form.patchValue({
        jenis_lawatan: "janji temu"
      })
    }
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

    });
  }

  getNegeri() {
    this.negeriService.get().subscribe((res) => {
      console.log("negeri", res);

      this.negeri = res;

    });
  }

  getPT() {
    this.ptService.get().pipe(map(x => x.filter(i => i.Negeri_Rkod == this.negeriValue))).subscribe((res) => {
      console.log("pt", res);

      this.pt = res;

    });
  }

  getNegeriPt() {
    this.ptService.getNegeriPt(this.pegawai_id).subscribe((res) => {
      console.log("pt", res);

      this.pt = res;

    });
  }

  async getUsahawan() {
    console.log("ptValue", this.ptValue);
    const loading = await this.loadingController.create({ message: 'Loading ...' });
    loading.present();

    this.usahawanService.get().pipe(map(x => x.filter(i => i.Kod_PT == this.ptValue))).subscribe((res) => {
      console.log("usahawan", res);

      this.usahawan = res;
      loading.dismiss();
    });

  }

  async logForm() {

    if (this.images.length > 0) {
      this.form.value.gambar_lawatan = this.images[0].data;
    } else {
      this.form.value.gambar_lawatan = this.laporan.gambar_lawatan;
    }

    this.form.value.id_pegawai = this.pegawai_id;
    this.form.value.tarikh_lawatan = moment(this.form.value.tarikh_lawatan).format('YYYY-MM-DD');
    this.form.value.masa_lawatan = moment(this.form.value.masa_lawatan).format('HH:mm');

    console.log(this.form.value)

    const loading = await this.loadingController.create({ message: 'Loading ...' });
    loading.present();
    
    this.lawatanService.tambahLaporan(this.form.value).subscribe((res) => {
      console.log("laporan baru", res);

      loading.dismiss();
      this.dismiss();
      window.location.reload();
    });
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
