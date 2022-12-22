import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-carian-usahawan',
  templateUrl: './carian-usahawan.page.html',
  styleUrls: ['./carian-usahawan.page.scss'],
})
export class CarianUsahawanPage implements OnInit {

  @Input() usahawans: any;
  
  searchTerm: string;
  

  constructor(
    public modalController: ModalController,
  ) { }

  
  peranan: any;
  ngOnInit() {
    this.peranan = window.sessionStorage.getItem("peranan_pegawai");
    console.log("senarai",this.usahawans)
  }


  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  selectDismiss() {
   
    console.log("usahawan",this.pilihUsahawan)
    // this.modalController.dismiss({
    //   'dismissed': true
    // });

    this.modalController.dismiss(this.pilihUsahawan);
  }

  pilihUsahawan: any;
}
