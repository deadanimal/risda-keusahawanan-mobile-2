import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { KatalogService } from 'src/app/services/katalog/katalog.service';
import { MaklumatProdukPage } from '../maklumat-produk/maklumat-produk.page';

@Component({
  selector: 'app-katalog-pegawai',
  templateUrl: './katalog-pegawai.page.html',
  styleUrls: ['./katalog-pegawai.page.scss'],
})
export class KatalogPegawaiPage implements OnInit {

 

  katalog = [

  ]

  constructor(
    public modalController: ModalController,
    private katalogService: KatalogService,
    private router: Router,
    public loadingController: LoadingController,

  ) { }

  user_id : any
  pegawai_id : any

  ngOnInit() {
    this.user_id = window.sessionStorage.getItem("user_id");
    this.pegawai_id = window.sessionStorage.getItem("pegawai_id");
    
    this.getKatalog();
  }

  async lihatKatalog(katalog: any) {
    console.log("kemaskini Katalog");
    const modal = await this.modalController.create({
      component: MaklumatProdukPage,
      componentProps: { katalog },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async getKatalog() {
    const loading = await this.loadingController.create({ message: 'Loading ...' });
    loading.present();
    console.log("this.user_id", this.user_id);
    this.katalogService.getKatalogPegawai(this.pegawai_id).pipe(map(x => x.filter(i => i.status_katalog != "draft"))).subscribe((res) => {
      console.log("katalog", res);

      this.katalog = res
      loading.dismiss();

    });

  }


  dashboard() {
    this.router.navigate(['/dashboard'])
  }

}
