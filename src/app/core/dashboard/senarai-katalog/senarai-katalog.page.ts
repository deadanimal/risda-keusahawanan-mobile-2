import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { KatalogService } from 'src/app/services/katalog/katalog.service';
import { ShowKatalogPage } from '../show-katalog/show-katalog.page';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-senarai-katalog',
  templateUrl: './senarai-katalog.page.html',
  styleUrls: ['./senarai-katalog.page.scss'],
})
export class SenaraiKatalogPage implements OnInit {
  katalog: any;
  env = environment.baseUrl;

  constructor(
    private katalogService : KatalogService,
    public modalController: ModalController,
    public loadingController: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    this.getKatalog()
  }

  async getKatalog() {

    const loading = await this.loadingController.create({ message: 'Loading ...' });
    loading.present();

    this.katalogService.getAll().pipe(map(x => x.filter(i => i.status_katalog == "publish"))).subscribe((res) => {
      // this.daerahService.get().subscribe((res) => {
      console.log("res", res);
      this.katalog = res;

      loading.dismiss();
      
    });

  }

  async lihatKatalog(katalog: any) {
    console.log("kemaskini Katalog");
    const modal = await this.modalController.create({
      component: ShowKatalogPage,
      componentProps: { katalog },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  dashboard(){
    this.router.navigate(['/dashboard'])
  }

}
