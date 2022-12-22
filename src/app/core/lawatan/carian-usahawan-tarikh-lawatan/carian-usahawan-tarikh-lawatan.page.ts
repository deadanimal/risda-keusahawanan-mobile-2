import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-carian-usahawan-tarikh-lawatan',
  templateUrl: './carian-usahawan-tarikh-lawatan.page.html',
  styleUrls: ['./carian-usahawan-tarikh-lawatan.page.scss'],
})
export class CarianUsahawanTarikhLawatanPage implements OnInit {

  @Input() usahawans: any;
  
  searchTerm: string;
  

  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() {

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
