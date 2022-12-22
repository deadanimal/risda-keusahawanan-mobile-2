import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { BuletinService } from 'src/app/services/buletin/buletin.service';
import { ShowBuletinPage } from '../show-buletin/show-buletin.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-senarai-buletin',
  templateUrl: './senarai-buletin.page.html',
  styleUrls: ['./senarai-buletin.page.scss'],
})
export class SenaraiBuletinPage implements OnInit {

  buletin: any;

  constructor(
    private buletinService : BuletinService,
    public modalController: ModalController,
    private router: Router,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.getBuletin()
  }

  getBuletin() {
    this.buletinService.getAll().pipe(map(x => x.filter(i => i.status == "aktif"))).subscribe((res) => {
      // this.daerahService.get().subscribe((res) => {
      console.log("res", res);
      this.buletin = res;
      
    });

  }

  async lihatBuletin(buletin: any) {
    // console.log("kemaskini Katalog");
    const modal = await this.modalController.create({
      component: ShowBuletinPage,
      componentProps: { buletin },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  dashboard(){
    this.router.navigate(['/dashboard'])
  }
}