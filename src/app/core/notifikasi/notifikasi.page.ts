import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifikasiService } from 'src/app/services/notifikasi/notifikasi.service';

@Component({
  selector: 'app-notifikasi',
  templateUrl: './notifikasi.page.html',
  styleUrls: ['./notifikasi.page.scss'],
})
export class NotifikasiPage implements OnInit {

  usahawan_id : any
  pegawai_id : any
  user_id: any
  role : any
  peranan_pegawai : any

  constructor(
    private notiService: NotifikasiService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.usahawan_id = window.sessionStorage.getItem("usahawan_id");
    this.pegawai_id = window.sessionStorage.getItem("pegawai_id");
    this.user_id = window.sessionStorage.getItem("user_id");
    this.role = window.sessionStorage.getItem("role");
    this.peranan_pegawai = window.sessionStorage.getItem("peranan_pegawai");



    console.log("user_id", this.user_id);

    this.getNoti()
  }

  notifikasi: any;


  getNoti() {
    this.notiService.get(this.user_id).subscribe((res) => {
      console.log("notification", res);
      this.notifikasi = res
    });
  }

  routing(notifikasi) {

    console.log(notifikasi)
    this.notiService.updateStatus(notifikasi.id).subscribe((res) => {
      console.log("updated status", res);

      if (this.usahawan_id != null) {
        if (notifikasi.modul == "katalog") {

          this.router.navigate(['/katalog'])
        } else if (notifikasi.modul == "lawatan") {

          this.router.navigate(['/lawatan-usahawan'])
        }

      } else if (this.usahawan_id == null) {
        console.log("pegi katalog")

        if (notifikasi.modul == "katalog") {

          this.router.navigate(['/katalog-pegawai'])
        } else if (notifikasi.modul == "lawatan") {

          this.router.navigate(['/lawatan-pegawai'])
        }

      }

    });

  }

  dashboard(){
    this.router.navigate(['/dashboard'])
  }

}
