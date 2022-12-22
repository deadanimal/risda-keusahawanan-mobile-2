import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  LoadingController,
  ModalController,
} from "@ionic/angular";
import { KatalogService } from "src/app/services/katalog/katalog.service";
import { KemaskiniKatalogPage } from "../kemaskini-katalog/kemaskini-katalog.page";
import { TambahKatalogPage } from "../tambah-katalog/tambah-katalog.page";

@Component({
  selector: "app-katalog",
  templateUrl: "./katalog.page.html",
  styleUrls: ["./katalog.page.scss"],
})
export class KatalogPage implements OnInit {
  constructor(
    public modalController: ModalController,
    private katalogService: KatalogService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private router: Router
  ) {}

  usahawan_id: any;
  user_id: any;

  ngOnInit() {
    this.usahawan_id = window.sessionStorage.getItem("usahawan_id");
    this.user_id = window.sessionStorage.getItem("user_id");

    // do something on modal dismiss

    this.getKatalog();
  }

  katalog: any;

  async tambahKatalog() {
    console.log("tambah Katalog");
    console.log(this.katalog.length);

    if (this.katalog.length >= 10) {
      console.log("lebih 10");
      this.presentAlert();
    } else {
      const modal = await this.modalController.create({
        component: TambahKatalogPage,
        cssClass: "my-custom-class",
      });
      modal.onDidDismiss().then((data: any) => {
        console.log("returned to the page");
        console.log(data);

        console.log(data.data.refresh);

        if (data.data.refresh) {
          console.log("refreshing the katalog");
          this.getKatalog();
        }
      });

      return await modal.present();
    }
  }

  async kemaskiniKatalog(katalog: any) {
    console.log("kemaskini Katalog");
    const modal = await this.modalController.create({
      component: KemaskiniKatalogPage,
      componentProps: { katalog },
      cssClass: "my-custom-class",
    });
    return await modal.present();
  }

  async getKatalog() {
    console.log("this.user_id", this.user_id);

    const loading = await this.loadingController.create({
      message: "Loading ...",
    });
    loading.present();

    this.katalogService.get(this.user_id).subscribe((res) => {
      console.log("katalog", res);

      this.katalog = res;

      loading.dismiss();
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Ralat",
      subHeader: "Jumlah tidak boleh melebihi 10 katalog",
      message: "",
      buttons: ["OK"],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log("onDidDismiss resolved with role", role);
  }

  dashboard() {
    this.router.navigate(["/dashboard"]);
  }

  ionViewDidEnter() {
    console.log("getting back to page");
  }
}
