import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { LawatanService } from 'src/app/services/lawatan/lawatan.service';
import { environment } from 'src/environments/environment';
import { PengesahanTarikhLawatanPgwPage } from '../pengesahan-tarikh-lawatan-pgw/pengesahan-tarikh-lawatan-pgw.page';

import { HTTP } from '@ionic-native/http/ngx';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lawatan-usahawan',
  templateUrl: './lawatan-usahawan.page.html',
  styleUrls: ['./lawatan-usahawan.page.scss'],
})
export class LawatanUsahawanPage implements OnInit {


  user_id :any
  lawatan: any;
  laporan: any;

  constructor(
    public modalController: ModalController,
    private lawatanService: LawatanService,
    private http: HTTP,
    private iab: InAppBrowser,
    private router: Router,
    

  ) { }

  ngOnInit() {
    this.user_id = window.sessionStorage.getItem("user_id");
    
    this.getLawatan();
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

  getLawatan() {

    this.lawatanService.getLawatanUsahawan(this.user_id).pipe(map(x => x.filter(i => i.status_lawatan != "4"))).subscribe((res) => {
      console.log("res", res);

      this.lawatan = res;
      // window.location.reload();
    });

    this.lawatanService.getLawatanUsahawan(this.user_id).pipe(map(x => x.filter(i => i.status_lawatan == "4"))).subscribe((res) => {
      console.log("res2", res);

      this.laporan = res;
      // window.location.reload();
      // this.lawatan
    });

  }

  // const fileTransfer: FileTransferObject = this.transfer.create();
  download_laporan(id) {

    console.log(id);
    this.lawatanService.janaLaporan(id).subscribe((res) => {
      console.log("res3", res);

      let url = environment.baseUrl + 'storage/' + res;

      console.log(url);
      // window.open(url, "_blank");
      const browser = this.iab.create(url, '_system');



    });
  }

  dashboard(){
    this.router.navigate(['/dashboard'])
  }

}
