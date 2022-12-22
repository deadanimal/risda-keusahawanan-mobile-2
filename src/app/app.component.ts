import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from "@angular/router";
import { PegawaiService } from "./services/pegawai/pegawai.service";
import { UsahawanService } from "./services/usahawan/usahawan.service";
import { NotifikasiService } from "./services/notifikasi/notifikasi.service";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  pegawai: any;
  loading = true;

  public appPages = [
    { title: "Profil", url: "/profile", icon: "assets/new-iconv2/Profil.png" },
    { title: "Home", url: "/dashboard", icon: "assets/home-icon.png" },

    {
      title: "Insentif",
      url: "/insentif",
      icon: "assets/new-iconv2/Insentif.png",
    },
    {
      title: "Aliran Tunai",
      url: "/aliran-tunai",
      icon: "assets/new-iconv2/Aliran-Tunai.png",
    },
    {
      title: "Buku tunai",
      url: "/buku-tunai",
      icon: "assets/new-iconv2/Buku-Tunai.png",
    },
    {
      title: "Ringkasan lejar",
      url: "/ringkasan-lejar",
      icon: "assets/new-iconv2/Ringkasan-Lejar.png",
    },
    {
      title: "Penyata Untung Rugi",
      url: "/pnl",
      icon: "assets/new-iconv2/Penyata-Untung-Rugi.png",
    },
    { title: "Katalog", url: "katalog", icon: "assets/new-iconv2/Katalog.png" },
    {
      title: "Jana Dokumen",
      url: "/jana-dokumen",
      icon: "assets/new-iconv2/Jana-Dokumen.png",
    },
    {
      title: "Lawatan",
      url: "lawatan-usahawan",
      icon: "assets/new-iconv2/Lawatan.png",
    },
    // { title: 'Log Keluar',  url: '#', icon: 'assets/new-icon/log-out-button.png' },
  ];

  public appPagesPegawai = [
    { title: "Carian", url: "/carian", icon: "assets/new-iconv2/Cari.png" },
    {
      title: "Lawatan",
      url: "/lawatan-pegawai",
      icon: "assets/new-iconv2/Lawatan.png",
    },
    // { title: 'Katalog', url: '/katalog-pegawai', icon: 'assets/new-iconv2/Katalog.png' },
    // { title: 'Buletin', url: '/buletin', icon: 'assets/new-icon/Buletin.png' },
    // { title: 'Log Keluar', url: '#', icon: 'assets/new-icon/log-out-button.png' },
  ];
  usahawan_id: any;
  pegawai_id: any;
  user_id: any;
  role: any;
  peranan_pegawai: any;

  constructor(
    private router: Router,
    private pegawaiService: PegawaiService,
    private usahawanService: UsahawanService,
    private notiService: NotifikasiService
  ) {
    this.router.events.subscribe((e: RouterEvent) => {});
  }

  ngOnInit() {
    this.usahawan_id = window.sessionStorage.getItem("usahawan_id");
    this.pegawai_id = window.sessionStorage.getItem("pegawai_id");
    this.user_id = window.sessionStorage.getItem("user_id");
    this.role = window.sessionStorage.getItem("role");
    this.peranan_pegawai = window.sessionStorage.getItem("peranan_pegawai");
    console.log(this.appPages);

    console.log("role", this.role);
    console.log("usahawan_id", this.usahawan_id);
    console.log("pegawai_id", this.pegawai_id);
    console.log("peranan_pegawai", this.peranan_pegawai);
    console.log("user_id", this.user_id);

    if (this.usahawan_id == null && this.pegawai_id != null) {
      this.getpegawai();
    } else {
      this.getusahawan();
    }

    if (this.peranan_pegawai == "7") {
      this.appPagesPegawai[1].url = "/lawatan-pegawai";
      console.log("peranan_pegawai success", this.appPagesPegawai[1]);
    } else {
      this.appPagesPegawai[1].url = "/senarai-laporan-pegawai";
      console.log("peranan_pegawai success", this.appPagesPegawai[1]);
    }

    if (this.peranan_pegawai == "3" || this.peranan_pegawai == "4") {
      this.appPagesPegawai.push({
        title: "Katalog",
        url: "/katalog-pegawai",
        icon: "assets/new-iconv2/Katalog.png",
      });
    }

    if (this.peranan_pegawai == "1") {
      this.appPagesPegawai.push({
        title: "Buletin",
        url: "/buletin",
        icon: "assets/new-iconv2/Buletin.png",
      });
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(["/"]);
  }

  getpegawai() {
    this.pegawaiService.get(this.pegawai_id).subscribe((res) => {
      console.log("res", res);
      this.pegawai = res.nama;
    });
  }

  // usahawan: any;
  gambar_usahawan: any;
  getusahawan() {
    this.usahawanService.show(this.usahawan_id).subscribe((res) => {
      // console.log("AAAAAA", res.gambar_url);

      // if (res.gambar_url != "null" || res.gambar_url != null) {
      //   this.gambar_usahawan = res.gambar_url
      // } else {
      //   this.gambar_usahawan = "assets/new-icon/default_profile.png"
      // }

      if (res.gambar_url == "null" || res.gambar_url == null) {
        this.gambar_usahawan = "assets/new-icon/default_profile.png";
      } else {
        this.gambar_usahawan = res.gambar_url;
      }
    });
  }

  // profil() {
  //   this.router.navigate(["/profile"]);
  // }

  openPage(url) {
    console.log("routing to ");
    this.router.navigate([url]);
  }
}
