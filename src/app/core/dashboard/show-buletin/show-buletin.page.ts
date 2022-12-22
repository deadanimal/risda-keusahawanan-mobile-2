import { Component, Input, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
// import { KatalogService } from 'src/app/services/katalog/katalog.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-show-buletin',
  templateUrl: './show-buletin.page.html',
  styleUrls: ['./show-buletin.page.scss'],
})
export class ShowBuletinPage implements OnInit {

  @Input() buletin: any;

  constructor(
    public modalController: ModalController,
    // private katalogService: KatalogService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private iab: InAppBrowser

  ) { }

  ngOnInit() {
    console.log("katalog", this.buletin)
  }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  openUrl(url){
    const browser = this.iab.create(url, '_system');
  }


}
