import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { DaerahService } from 'src/app/services/daerah/daerah.service';
import { DunService } from 'src/app/services/dun/dun.service';
import { KampungService } from 'src/app/services/kampung/kampung.service';
import { MukimService } from 'src/app/services/mukim/mukim.service';
import { NegeriService } from 'src/app/services/negeri/negeri.service';
import { ParlimenService } from 'src/app/services/parlimen/parlimen.service';
import { SeksyenService } from 'src/app/services/seksyen/seksyen.service';

@Component({
  selector: 'app-lokaliti-tanah',
  templateUrl: './lokaliti-tanah.page.html',
  styleUrls: ['./lokaliti-tanah.page.scss'],
})
export class LokalitiTanahPage implements OnInit {


  @Input() maklumatTanah: any;
  // @Input() index: any;

  data: any;
  index:any;

  private form: FormGroup;

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private negeriService: NegeriService,
    private daerahService: DaerahService,
    private mukimService: MukimService,
    private parlimenService: ParlimenService,
    private dunService: DunService,
    private kampungService: KampungService,
    private seksyenService: SeksyenService,
    private loadingController: LoadingController,
    public alertController: AlertController,
  ) { 
    this.form = this.formBuilder.group({
      pekebunid: ['',],
      No_Geran: ['',],
      No_Lot: ['',],
      U_Negeri_ID: [''],
      U_Daerah_ID: ['',],
      U_Mukim_ID: [''],
      U_Parlimen_ID: [''],
      U_Dun_ID: [''],
      U_Kampung_ID: [''],
      U_Seksyen_ID: [''],

      Luas_Lot: [''],

      Tanaman: this.formBuilder.array([]),
    });
  }


  /** Tanah */
  tanamans(): FormArray {
    return this.form.get("Tanaman") as FormArray
  }

  newTanaman(): FormGroup {
    return this.formBuilder.group({
      tanahid: ['',],
      Jenis_Tanaman: ['',],
    })
  }

  addTanaman() {
    this.tanamans().push(this.newTanaman());
  }

  async patchValue2() {

    const loading = await this.loadingController.create({ message: 'Loading ...' });
    loading.present();

    this.data.Tanaman.forEach(t => {

      var tanah: FormGroup = this.newTanaman();

      // console.log("patch tanah", tanah.value);
      this.tanamans().push(tanah);

    });

    this.form.patchValue(this.data);

    console.log("form", this.form.value)

    loading.dismiss();

  }


  ngOnInit() {

    console.log("dataLALALAL", this.maklumatTanah)

    this.data = this.maklumatTanah[0].data;
    this.index = this.maklumatTanah[0].index;

    console.log("index", this.index)
    console.log("datakasdkjs", this.data)
    this.getLocaliti()
  }


  dismiss() {
    
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  negeri: any;
  daerah: any;
  mukim: any;
  parlimen: any;
  dun: any
  kampung: any
  seksyen: any;

  async getLocaliti() {

    const loading = await this.loadingController.create({ message: 'Loading ...' });
    loading.present();

    this.negeriService.get().pipe(map(x => x.filter(i => i.U_Negeri_ID == this.data.U_Negeri_ID))).subscribe((resNegeri) => {
      console.log("Negeri", resNegeri)
      this.negeri = resNegeri;

      this.daerahService.get().pipe(map(x => x.filter(i => i.U_Daerah_ID == this.data.U_Daerah_ID))).subscribe((resDaerah) => {
        console.log("resDaerah", resDaerah)
        this.daerah = resDaerah;

        this.mukimService.get().pipe(map(x => x.filter(i => i.U_Mukim_ID == this.data.U_Mukim_ID))).subscribe((resMukim) => {
          console.log("resMukim", resMukim)
          this.mukim = resMukim;

          this.parlimenService.get().pipe(map(x => x.filter(i => i.U_Parlimen_ID == this.data.U_Parlimen_ID))).subscribe((resParlimen) => {
            console.log("resParlimen", resParlimen)
            this.parlimen = resParlimen;

            this.dunService.get().pipe(map(x => x.filter(i => i.U_Dun_ID == this.data.U_Dun_ID))).subscribe((resDun) => {
              console.log("resDun", resDun)
              this.dun = resDun;

              this.kampungService.get().pipe(map(x => x.filter(i => i.U_Kampung_ID == this.data.U_Kampung_ID))).subscribe((resKampung) => {
                console.log("resKampung", resKampung)
                this.kampung = resKampung;

                this.seksyenService.get().pipe(map(x => x.filter(i => i.U_Seksyen_ID == this.data.U_Seksyen_ID))).subscribe((resSeksyen) => {
                  console.log("resSeksyen", resSeksyen)
                  this.seksyen = resSeksyen;

                  this.patchValue2()
                  loading.dismiss();
                })
              })
            })
          })
        })
      })
    })
  }

}
