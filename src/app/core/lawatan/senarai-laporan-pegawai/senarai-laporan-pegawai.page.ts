import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { LawatanService } from 'src/app/services/lawatan/lawatan.service';
import { TambahLaporanPage } from '../tambah-laporan/tambah-laporan.page';
import { Router } from '@angular/router';
import { KemaskiniLaporanPage } from '../kemaskini-laporan/kemaskini-laporan.page';

@Component({
  selector: 'app-senarai-laporan-pegawai',
  templateUrl: './senarai-laporan-pegawai.page.html',
  styleUrls: ['./senarai-laporan-pegawai.page.scss'],
})
export class SenaraiLaporanPegawaiPage implements OnInit {

  pegawai_id :any
  laporan: any;

  constructor(
    public modalController: ModalController,
    private lawatanServicce : LawatanService,
    private router: Router,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.pegawai_id = window.sessionStorage.getItem("pegawai_id");

    this.getLaporan()
  }


  async tambahLaporan(laporan) {
    console.log("pengesahan lawatan");
    const modal = await this.modalController.create({
      component: TambahLaporanPage,
      componentProps: { laporan },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }


  async getLaporan() {

    const loading = await this.loadingController.create({ message: 'Loading ...' });
    loading.present();


    this.lawatanServicce.get(this.pegawai_id).pipe(map(x => x.filter(i => i.status_lawatan == '4'))).subscribe((res) => {
      console.log("laporan", res);

      this.laporan = res;

      loading.dismiss();

    });
  }

  async kemaskiniLaporan(laporan) {
    console.log("pengesahan lawatan");
    const modal = await this.modalController.create({
      component: KemaskiniLaporanPage,
      componentProps: { laporan },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  dashboard(){
    this.router.navigate(['/dashboard'])
  }
}
