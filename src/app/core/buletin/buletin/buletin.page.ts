import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { BuletinService } from 'src/app/services/buletin/buletin.service';
import { KemaskiniBuletinPage } from '../kemaskini-buletin/kemaskini-buletin.page';
import { TambahBuletinPage } from '../tambah-buletin/tambah-buletin.page';

@Component({
  selector: 'app-buletin',
  templateUrl: './buletin.page.html',
  styleUrls: ['./buletin.page.scss'],
})
export class BuletinPage implements OnInit {

  

  buletin: any;

  constructor(
    public modalController: ModalController,
    private buletinService: BuletinService,
    private router: Router,
    public loadingController: LoadingController,
  ) { }

  pegawai_id : any
  user_id : any

  ngOnInit() {

    this.pegawai_id = window.sessionStorage.getItem("pegawai_id");
    this.user_id = window.sessionStorage.getItem("user_id");


    this.getBuletin();
  }

  async getBuletin() {
    const loading = await this.loadingController.create({ message: 'Loading ...' });
    loading.present();
    this.buletinService.get(this.pegawai_id).subscribe((res) => {
      console.log("res", res);

      this.buletin = res;

      loading.dismiss();

    });
  }

  async tambahBuletin() {
    console.log("Tambah Dokumen");
    const modal = await this.modalController.create({
      component: TambahBuletinPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async kemaskiniBuletin(buletin) {
    console.log("Tambah Dokumen");
    const modal = await this.modalController.create({
      component: KemaskiniBuletinPage,
      componentProps: { buletin },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }


  dashboard() {
    this.router.navigate(['/dashboard'])
  }
}
