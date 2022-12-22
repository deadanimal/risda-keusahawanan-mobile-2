import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { LawatanService } from 'src/app/services/lawatan/lawatan.service';
import { KemaskiniLaporanPage } from '../kemaskini-laporan/kemaskini-laporan.page';
import { PengesahanTarikhLawatanPgwPageModule } from '../pengesahan-tarikh-lawatan-pgw/pengesahan-tarikh-lawatan-pgw.module';
import { PengesahanTarikhLawatanPgwPage } from '../pengesahan-tarikh-lawatan-pgw/pengesahan-tarikh-lawatan-pgw.page';
import { TambahLaporanPage } from '../tambah-laporan/tambah-laporan.page';
import { TarikhLawatanPgwPage } from '../tarikh-lawatan-pgw/tarikh-lawatan-pgw.page';

@Component({
  selector: 'app-lawatan-pegawai',
  templateUrl: './lawatan-pegawai.page.html',
  styleUrls: ['./lawatan-pegawai.page.scss'],
})
export class LawatanPegawaiPage implements OnInit {




  lawatan: any;
  laporan: any;

  constructor(
    public modalController: ModalController,
    private lawatanService: LawatanService,
    private router: Router,

  ) { }

  pegawai_id :any
  user_id :any
  peranan_pegawai :any

  ngOnInit() {

    this.pegawai_id = window.sessionStorage.getItem("pegawai_id");
    this.user_id = window.sessionStorage.getItem("user_id");
    this.peranan_pegawai = window.sessionStorage.getItem("peranan_pegawai");


    this.getLawatan();

    document.getElementById("1").click();
    console.log("peranan_pegawai", this.peranan_pegawai)
  }

  async addLawatan() {
    console.log("tambah lawatan");
    const modal = await this.modalController.create({
      component: TarikhLawatanPgwPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async pengesahanLawatan(lawatan) {
    console.log("pengesahan lawatan");
    const modal = await this.modalController.create({
      component: PengesahanTarikhLawatanPgwPage,
      componentProps: { lawatan },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async tambahLaporan(laporan) {
    console.log("pengesahan lawatan");
    const modal = await this.modalController.create({
      component: KemaskiniLaporanPage,
      componentProps: { laporan },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  getLawatan() {

    this.lawatanService.get(this.pegawai_id).pipe(map(x => x.filter(i => i.status_lawatan != "4"))).subscribe((res) => {
      console.log("res", res);

      this.lawatan = res;
      // window.location.reload();
      // this.lawatan
    });

    this.lawatanService.get(this.pegawai_id).pipe(map(x => x.filter(i => i.status_lawatan == "4"))).subscribe((res) => {
      console.log("res2", res);

      this.laporan = res;
      // window.location.reload();
      // this.lawatan
    });

  }

  dashboard() {
    this.router.navigate(['/dashboard'])
  }

}
