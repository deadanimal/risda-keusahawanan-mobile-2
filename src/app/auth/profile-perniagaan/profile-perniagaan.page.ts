import { Component, OnInit, NgZone } from '@angular/core';

import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/services/login/login.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PerniagaanModel } from 'src/app/services/perniagaan/perniagaan.model';
import { PerniagaanService } from 'src/app/services/perniagaan/perniagaan.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { DaerahService } from 'src/app/services/daerah/daerah.service';
import { DunService } from 'src/app/services/dun/dun.service';
import { KampungService } from 'src/app/services/kampung/kampung.service';
import { MukimService } from 'src/app/services/mukim/mukim.service';
import { NegeriService } from 'src/app/services/negeri/negeri.service';
import { ParlimenService } from 'src/app/services/parlimen/parlimen.service';
import { SeksyenService } from 'src/app/services/seksyen/seksyen.service';
import { ProdukService } from 'src/app/services/produk/produk.service';
import { AliranService } from 'src/app/services/Aliran/aliran.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { KlusterService } from 'src/app/services/kluster/kluster.service';

@Component({
  selector: 'app-profile-perniagaan',
  templateUrl: './profile-perniagaan.page.html',
  styleUrls: ['./profile-perniagaan.page.scss'],
})


export class ProfilePerniagaanPage implements OnInit {

  form: FormGroup;

  

  jenis_perniagaan = [
    { id: "A", name: "PENGELUARAN PRODUK MAKANAN" },
    { id: "B", name: "PENGELUARAN PRODUK BUKAN MAKANAN" },
    { id: "C", name: "PENGELUARAN PRODUK PERTANIAN" },
    { id: "D", name: "PERKHIDMATAN PEMASARAN" },
    { id: "E", name: "PERKHIDMATAN BUKAN PEMASARAN" },
  ]

  klusterPerniagaan: any;

  negeri: any;
  daerah: any;
  mukim: any;
  parlimen: any;
  dun: any;
  kampung: any;
  seksyen: any;
  produk: any;

  constructor(
    private perniagaanService: PerniagaanService,
    private router: Router,
    private perniagaan: PerniagaanModel,
    public alertController: AlertController,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private negeriService: NegeriService,
    private daerahService: DaerahService,
    private mukimService: MukimService,
    private parlimenService: ParlimenService,
    private dunService: DunService,
    private kampungService: KampungService,
    private seksyenService: SeksyenService,
    private produkService: ProdukService,
    private aliranService: AliranService,
    private geolocation: Geolocation,
    private klusterService: KlusterService
    // private geolocation: Geolocation
  ) {
    this.form = this.formBuilder.group({
      jenisperniagaan: ['', Validators.required],
      klusterperniagaan: ['', Validators.required],
      subkluster: ['', Validators.required],
      alamat1: ['', Validators.required],
      alamat2: ['', Validators.required],
      alamat3: ['', Validators.required],
      bandar: ['', Validators.required],
      poskod: ['', Validators.required],
      U_Negeri_ID: ['', Validators.required],
      U_Daerah_ID: ['', Validators.required],
      U_Mukim_ID: ['', Validators.required],
      U_Parlimen_ID: ['', Validators.required],
      U_Dun_ID: ['', Validators.required],
      U_Kampung_ID: ['',],
      U_Seksyen_ID: ['',],
      latitud: ['', Validators.required],
      logitud: ['', Validators.required],
      facebook: ['',],
      instagram: ['',],
      twitter: ['',],
      lamanweb: ['',],
      dropship: ['',],
      ejen: ['',],
      stokis: ['',],
      outlet: ['',],
      domestik: ['',],
      luarnegara: ['',],
      pasaranonline: ['',],
      purata_jualan_bulanan: ['',],
      peratus_kenaikan: ['',],
      hasil_jualan_tahunan: ['',],

      produk: this.formBuilder.array([]),
    })
  }

  count: any = 0;
  productLength: any = 0;
  addProduk() {
    const produk = this.formBuilder.group({
      id: ['',],
      perniagaanid: ['',],
      jenamaproduk: ['',],
      unitmatrik: ['',],
      hargaperunit: ['',],
      kapasitimaksimum: ['',],
      kapasitisemasa: ['',],
      modified_by: [''],
    });
    this.getProdukArray.push(produk);

    this.count++;
    this.productLength = this.getProdukArray.length;
    console.log("this.productLength", this.productLength)
    console.log('After Add: ', this.form.value);
  }

  get getProdukArray() {
    return (<FormArray>this.form.get('produk'));
  }

  deleteProduk(i, id) {

    console.log(id);

    this.getProdukArray.removeAt(i);

    this.count--;
    this.productLength = this.getProdukArray.length;

    if (id != '') {
      this.produkService.delete(id).subscribe((res) => {
        console.log("deleted produk", res);
      });
    }
  }

  setProdukVAlue() {

    this.produk.forEach(element => {
      const produk = this.formBuilder.group({
        id: element.id,
        perniagaanid: element.perniagaanid,
        jenamaproduk: element.jenamaproduk,
        unitmatrik: element.unitmatrik,
        hargaperunit: element.hargaperunit,
        kapasitimaksimum: element.kapasitimaksimum,
        kapasitisemasa: element.kapasitisemasa,
        modified_by: element.modified_by
      });
      this.getProdukArray.push(produk);

      this.count++;
      this.productLength = this.getProdukArray.length;
      console.log("this.productLength", this.productLength)
      console.log('After Add: ', this.form.value);
    });
  }

  usahawan_id: any;
  user_id: any;
  
  ngOnInit() {

    this.usahawan_id = window.sessionStorage.getItem("usahawan_id");
    this.user_id = window.sessionStorage.getItem("user_id");

    console.log("usahawan id", this.usahawan_id);
    console.log("user id", this.user_id);

    this.getPerniagaan();


  }

  async getPerniagaan() {
    const loading = await this.loadingController.create({ message: 'Loading ...' });
    loading.present();
    // console.log(this.form.value);
    this.perniagaanService.show(this.usahawan_id).subscribe((res) => {
      console.log("perniagaan info", res);

      if (Object.keys(res).length === 0) {
        console.log("failed")
        loading.dismiss();

      }
      else {
        this.perniagaan = res;

        this.produkService.get(res.id).subscribe((produkRes) => {
          console.log("produk", produkRes);
          this.produk = produkRes;

          if (Object.keys(produkRes).length == 0 && this.productLength ==0) {
            this.addProduk();
          }

          this.negeriService.get().subscribe((resNegeri) => {
            console.log("Negeri", resNegeri)
            this.negeri = resNegeri;

            this.daerahService.get().pipe(map(x => x.filter(i => i.U_Negeri_ID == this.perniagaan.U_Negeri_ID))).subscribe((resDaerah) => {
              console.log("resDaerah", resDaerah)
              this.daerah = resDaerah;

              this.mukimService.get().pipe(map(x => x.filter(i => i.U_Daerah_ID == this.perniagaan.U_Daerah_ID))).subscribe((resMukim) => {
                console.log("resMukim", resMukim)
                this.mukim = resMukim;

                this.parlimenService.get().pipe(map(x => x.filter(i => i.U_Negeri_ID == this.perniagaan.U_Negeri_ID))).subscribe((resParlimen) => {
                  console.log("resParlimen", resParlimen)
                  this.parlimen = resParlimen;

                  this.dunService.get().pipe(map(x => x.filter(i => i.U_Parlimen_ID == this.perniagaan.U_Parlimen_ID))).subscribe((resDun) => {
                    console.log("resDun", resDun)
                    this.dun = resDun;

                    this.kampungService.get().pipe(map(x => x.filter(i => i.U_Mukim_ID == this.perniagaan.U_Mukim_ID))).subscribe((resKampung) => {
                      console.log("resKampung", resKampung)
                      this.kampung = resKampung;


                      let mukimStr = this.perniagaan.U_Mukim_ID;
                      // let mukimInt = parseInt(mukimStr.toString())

                      this.seksyenService.get().pipe(map(x => x.filter(i => i.U_Mukim_ID == mukimStr))).subscribe((resSeksyen) => {
                        console.log("resSeksyen", resSeksyen)
                        this.seksyen = resSeksyen;

                        this.klusterService.get().pipe(map(x => x.filter(i => i.jenis_kluster == this.perniagaan.jenisperniagaan))).subscribe((resKluster) => {
                          console.log("kluster", resKluster);
                          this.klusterPerniagaan = resKluster

                          this.setFormValues()
                          loading.dismiss();

                        });



                      })
                    })
                  })
                })
              })
            })
          })

        });

      }
    });

  }

  setFormValues() {
    this.form.patchValue({
      jenisperniagaan: this.perniagaan.jenisperniagaan,
      klusterperniagaan: this.perniagaan.klusterperniagaan,
      subkluster: this.perniagaan.subkluster,
      alamat1: this.perniagaan.alamat1,
      alamat2: this.perniagaan.alamat2,
      alamat3: this.perniagaan.alamat3,
      bandar: this.perniagaan.bandar,
      poskod: this.perniagaan.poskod,
      U_Negeri_ID: this.perniagaan.U_Negeri_ID,
      U_Daerah_ID: this.perniagaan.U_Daerah_ID,
      U_Mukim_ID: this.perniagaan.U_Mukim_ID,
      U_Parlimen_ID: this.perniagaan.U_Parlimen_ID,
      U_Dun_ID: this.perniagaan.U_Dun_ID,
      U_Kampung_ID: this.perniagaan.U_Kampung_ID,
      U_Seksyen_ID: this.perniagaan.U_Seksyen_ID,
      latitud: this.perniagaan.latitud,
      logitud: this.perniagaan.logitud,
      facebook: this.perniagaan.facebook,
      instagram: this.perniagaan.instagram,
      twitter: this.perniagaan.twitter,
      lamanweb: this.perniagaan.lamanweb,
      dropship: this.perniagaan.dropship,
      ejen: this.perniagaan.ejen,
      stokis: this.perniagaan.stokis,
      outlet: this.perniagaan.outlet,
      domestik: this.perniagaan.domestik,
      luarnegara: this.perniagaan.luarnegara,
      pasaranonline: this.perniagaan.pasaranonline,
      purata_jualan_bulanan: this.perniagaan.purata_jualan_bulanan,
      peratus_kenaikan: this.perniagaan.peratus_kenaikan,
      hasil_jualan_tahunan: this.perniagaan.hasil_jualan_tahunan
    })

    
    this.setProdukVAlue()
  }

  getKluster() {
    // this.form.value.klusterPerniagaan = null;
    this.klusterService.get().pipe(map(x => x.filter(i => i.jenis_kluster == this.form.value.jenisperniagaan))).subscribe((res) => {
      console.log("kluster", res);
      this.klusterPerniagaan = res

    });
  }

  resetKluster(){
    
    this.form.patchValue({
      klusterPerniagaan : null
    })

    console.log(this.form.value.klusterPerniagaan)
  }

  getNegeri() {
    this.negeriService.get().subscribe((res) => {
      console.log("negeri", res);
      this.negeri = res

    });

  }

  getDaerah(event) {

    this.daerahService.get().pipe(map(x => x.filter(i => i.U_Negeri_ID == this.form.value.U_Negeri_ID))).subscribe((res) => {

      console.log("Daerah", res);
      this.daerah = res;

      this.getParlimen();

    });

  }

  getMukim(event) {

    this.mukimService.get().pipe(map(x => x.filter(i => i.U_Daerah_ID == this.form.value.U_Daerah_ID))).subscribe((res) => {

      console.log("mukim", res);
      this.mukim = res;
    });
  }

  getParlimen() {

    this.parlimenService.get().pipe(map(x => x.filter(i => i.U_Negeri_ID == this.form.value.U_Negeri_ID))).subscribe((res) => {

      console.log("parlimen", res);
      this.parlimen = res;
    });
  }

  getDun() {

    this.dunService.get().pipe(map(x => x.filter(i => i.U_Parlimen_ID == this.form.value.U_Parlimen_ID))).subscribe((res) => {

      console.log("dun", res);
      this.dun = res;
    });
  }

  getKampung() {

    this.kampungService.get().pipe(map(x => x.filter(i => i.U_Mukim_ID == this.form.value.U_Mukim_ID))).subscribe((res) => {

      console.log("kampung", res);
      this.kampung = res;
    });
  }

  getSeksyen() {
    console.log(this.form.value.U_Mukim_ID)
    let mukim = parseInt(this.form.value.U_Mukim_ID)

    this.seksyenService.get().pipe(map(x => x.filter(i => i.U_Mukim_ID == mukim))).subscribe((res) => {

      console.log("seksyen", res);
      this.seksyen = res;
    });
  }

  async logForm() {


    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      message: 'Adakah anda setuju untuk menyimpan perubahan ini?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.setFormValues()

            console.log("AAAAAAAA",this.produk.length)
          }
        }, {
          text: 'Ya',
          handler: async () => {
            console.log('Confirm Okay');


            const loading = await this.loadingController.create({ message: 'Loading ...' });
            loading.present();
            console.log(this.form.value)

            let prodTemp = this.form.value.produk;
            let prodTempLength = prodTemp.length;

            console.log("prodTemp", prodTemp)

            this.perniagaanService.update(this.form.value, this.usahawan_id).subscribe((res) => {
              console.log("updated data", res);

              for (let i = 0; i < prodTempLength; i++) {

                console.log(prodTemp[i]);

                prodTemp[i].perniagaanid = res.id
                prodTemp[i].modified_by = this.usahawan_id;

                if (prodTemp[i].id == '') {
                  this.produkService.post(prodTemp[i]).subscribe((prodRes) => {
                    console.log("prodRes", prodRes);

                  });
                } else {
                  this.produkService.update(prodTemp[i], prodTemp[i].id).subscribe((prodRes) => {
                    console.log("prodRes", prodRes);

                  });
                }

              }

              loading.dismiss();
              this.presentAlert()
            });
          }
        }
      ]
    });

    await alert.present();

  }



  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Kemaskini Berjaya',
      subHeader: 'Kemaskini Maklumat Perniagaan Telah Berjaya',
      message: '',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  reset() {
    this.form.patchValue({
      U_Daerah_ID: null,
      U_Mukim_ID: null,
      U_Parlimen_ID: null,
      U_Dun_ID: null,
      U_Kampung_ID: null,
      U_Seksyen_ID: null,

    })
  }

  reset2() {
    this.form.patchValue({
      U_Kampung_ID: null,
      U_Seksyen_ID: null,
    })
  }

  calcMaklumatPendapatan() {

    let purata_tahunan_sebelum_bantuan = this.form.value.purata_jualan_bulanan;

    console.log(purata_tahunan_sebelum_bantuan);

    this.aliranService.getTotalYear(this.user_id).subscribe((res) => {
      console.log("jumlah tahunan", res);

      let jualan_tahunan_semasa = res;

      this.form.patchValue({
        hasil_jualan_tahunan: res,

      })

      let peratus_kenaikan = ((jualan_tahunan_semasa - purata_tahunan_sebelum_bantuan) / purata_tahunan_sebelum_bantuan) * 100;
      this.form.patchValue({
        peratus_kenaikan: peratus_kenaikan.toFixed(2),

      })

    });


  }



  latitude: any = 0; //latitude
  longitude: any = 0; //longitude

  options = {
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge: 3600
  };

  // use geolocation to get user's device coordinates
  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      this.form.patchValue({
        latitud: this.latitude,
        logitud: this.longitude
      })
    }).catch((error) => {
      console.log('Error getting location', error);
    });



    console.log(" this.latitude", this.latitude);
    console.log(" this.longitude", this.longitude);
  }

}
