import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { BuletinService } from 'src/app/services/buletin/buletin.service';
import { KatalogService } from 'src/app/services/katalog/katalog.service';
import { ShowBuletinPage } from './show-buletin/show-buletin.page';
import { ShowKatalogPage } from './show-katalog/show-katalog.page';
import { Router } from '@angular/router';
import { NotifikasiService } from 'src/app/services/notifikasi/notifikasi.service';
import { PegawaiService } from 'src/app/services/pegawai/pegawai.service';
import { UsahawanService } from 'src/app/services/usahawan/usahawan.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  katalog: any;
  buletin: any;
  env = environment.baseUrl;

  
  // user_id = window.sessionStorage.getItem("user_id");

  constructor(
    private loadingController : LoadingController,
    private katalogService: KatalogService,
    private buletinService: BuletinService,
    public modalController: ModalController,
    private router: Router,
    private notiService: NotifikasiService,
    private pegawaiService: PegawaiService,
    private usahawanService: UsahawanService,
  ) { }

  usahawan_id : any
  pegawai_id: any
  user_id : any
  role : any
  peranan_pegawai : any


  ngOnInit() {

    this.usahawan_id = window.sessionStorage.getItem("usahawan_id");
    this.pegawai_id = window.sessionStorage.getItem("pegawai_id");
    this.user_id = window.sessionStorage.getItem("user_id");
    this.role = window.sessionStorage.getItem("role");
    this.peranan_pegawai = window.sessionStorage.getItem("peranan_pegawai");

  
    // this.refresh();
    const firstTime = localStorage.getItem('key')
    if (!firstTime) {
      localStorage.setItem('key', 'loaded')
      location.reload()
    } else {
      localStorage.removeItem('key')
    }

    if (this.usahawan_id == null && this.pegawai_id != null) {
      this.getpegawai();
    } else {
      this.getusahawan();
    }

    this.getKatalog();
    this.getBuletin();
    this.getnoti()
  }

  async getKatalog() {

    const loading = await this.loadingController.create({ message: 'Loading ...' });
    loading.present();

    this.katalogService.katalogdashboard().pipe(map(x => x.filter(i => i.status_katalog == "publish"))).subscribe((res) => {
      // this.daerahService.get().subscribe((res) => {
      console.log("res", res.slice(0,5));
      this.katalog = res.slice(0,5);

      loading.dismiss();
      
    });

  }

  async getBuletin() {

    const loading = await this.loadingController.create({ message: 'Loading ...' });
    loading.present();

    this.buletinService.getAll().pipe(map(x => x.filter(i => i.status == "aktif"))).subscribe((res) => {
      // this.daerahService.get().subscribe((res) => {
      console.log("res", res);
      this.buletin = res.slice(0,3);
      
      loading.dismiss();
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

  async lihatKatalog(katalog: any) {
    console.log("kemaskini Katalog");
    const modal = await this.modalController.create({
      component: ShowKatalogPage,
      componentProps: { katalog },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  SenaraiKatalog(){
    this.router.navigate(['/dashboard/senarai-katalog'])
  }

  SenaraiBuletin(){
    this.router.navigate(['/dashboard/senarai-buletin'])
  }

  open_noti(){
    this.router.navigate(['/notifikasi'])
  }

  // refresh(): void {
  //   window.location.reload();
  // }

  noti: boolean = false;
  noti_icon_url= "assets/new-icon/notification-bell-(no-msg).png";

 
  getnoti() {
    this.notiService.get(this.user_id).subscribe((res) => {
      console.log("noti", res);

      for (let i =0; i< res.length; i++){
        // console.log(i)
        if(res[i].readstatus == 0 ){
          this.noti = true;

          this.noti_icon_url = "assets/icon/NOTIFICATION-BELL.png";
          console.log('AAAAAA',this.noti)
          break
        }
      }
    });
  }

  usahawan: any = null
  pegawai: any = null
  jenis_perniagaan: any = null

  getusahawan() {
    this.usahawanService.show(this.usahawan_id).subscribe((res) => {
      console.log("usahawan", res);

      this.usahawan =res

      if (res.perniagaan.jenisperniagaan == 'A') {
        this.jenis_perniagaan = 'PENGELUARAN PRODUK MAKANAN'
      } else if (res.perniagaan.jenisperniagaan == 'B') {
        this.jenis_perniagaan = 'PENGELUARAN PRODUK BUKAN MAKANA'
      } else if (res.perniagaan.jenisperniagaan == 'C') {
        this.jenis_perniagaan = 'PENGELUARAN PRODUK PERTANIAN'
      } else if (res.perniagaan.jenisperniagaan == 'D') {
        this.jenis_perniagaan = 'PERKHIDMATAN PEMASARAN'
      } else if (res.perniagaan.jenisperniagaan == 'E') {
        this.jenis_perniagaan = 'PERKHIDMATAN BUKAN PEMASARAN'
      } 


    });
  }

  getpegawai() {
    this.pegawaiService.get(this.pegawai_id).subscribe((res) => {
      console.log("pegawai", res[0]);
      this.pegawai = res[0];
    });
  }

}
