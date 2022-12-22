import { Component, HostListener, OnInit } from "@angular/core";

import { LoginService } from "src/app/services/login/login.service";
import { Observable } from "rxjs";
import { LoginModel } from "src/app/services/login/login.model";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Router } from "@angular/router";
import { UsahawanService } from "src/app/services/usahawan/usahawan.service";
import { UsahawanModel } from "src/app/services/usahawan/usahawan.model";
// import { LoginModel } from 'src/app/services/login/login.model';
import { LoadingController, PopoverController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";

import Swal from "sweetalert2";
import { NegeriService } from "src/app/services/negeri/negeri.service";
import { DaerahService } from "src/app/services/daerah/daerah.service";
import { map } from "rxjs/operators";
import { MukimService } from "src/app/services/mukim/mukim.service";
import { ParlimenService } from "src/app/services/parlimen/parlimen.service";
import { DunService } from "src/app/services/dun/dun.service";
import { KampungService } from "src/app/services/kampung/kampung.service";
import { SeksyenService } from "src/app/services/seksyen/seksyen.service";
import { KategoriUsahawanService } from "src/app/services/ketegori-usahawan/kategori-usahawan.service";
import { PusatTanggungjawabService } from "src/app/services/pusat-tanggungjawab/pusat-tanggungjawab.service";
import { AliranService } from "src/app/services/Aliran/aliran.service";
import { DatePipe } from "@angular/common";
import * as moment from "moment";

interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  users$: Observable<LoginModel[]>;

  form: FormGroup;

  usahawan_id: any;
  user_id: any;

  negeri: any;
  daerah: any;
  mukim: any;

  jantina = [
    { name: "Lelaki", id: 1 },
    { name: "Perempuan", id: 2 },
  ];

  bangsa = [
    { id: 1, name: "Melayu" },
    { id: 2, name: "Orang Asli Semenanjung" },
    { id: 3, name: "Bumiputera Sabah" },
    { id: 4, name: "Bumiputera Sarawak" },
    { id: 5, name: "Cina" },
    { id: 6, name: "India" },
    { id: 7, name: "Lain-lain" },
  ];

  statusperkahwinan = [
    { id: 1, name: "Tidak Pernah Berkahwin" },
    { id: 2, name: "Berkahwin" },
    { id: 3, name: "Balu / Duda" },
    { id: 4, name: "Bercerai" },
    { id: 5, name: "Berpisah" },
    { id: 9, name: "Tiada maklumat" },
  ];

  tahapPendidikan = [
    { id: 1, name: "Tidak Bersekolah" },
    { id: 2, name: "Sekolah Rendah / Setara" },
    { id: 3, name: "Sekolah Menengah / Setara" },
    { id: 4, name: "Kolej / Universiti / Setara" },
  ];

  taraf_kelulusan_tertinggi = [
    {
      U_Taraf_Kelulusan_Tertinggi_ID: "1",
      Jenis_Kelulusan: "UPSR/PSRA/Setaraf",
    },
    {
      U_Taraf_Kelulusan_Tertinggi_ID: "2",
      Jenis_Kelulusan: "PMR/SRP/LCE/Setaraf",
    },
    { U_Taraf_Kelulusan_Tertinggi_ID: "3", Jenis_Kelulusan: "SPM/MCE/Setaraf" },
    {
      U_Taraf_Kelulusan_Tertinggi_ID: "4",
      Jenis_Kelulusan: "STPM/Diploma/Setaraf",
    },
    {
      U_Taraf_Kelulusan_Tertinggi_ID: "5",
      Jenis_Kelulusan: "Ijazah Pertama/Ke Atas",
    },
    { U_Taraf_Kelulusan_Tertinggi_ID: "6", Jenis_Kelulusan: "Tiada" },
  ];

  statusDaftarUsahawan = [
    { id: "KP01", name: "PEKEBUN KECIL" },
    { id: "KP02", name: "PASANGAN PEKEBUN KECIL" },
    { id: "KP03", name: "ANAK PEKEBUN KECIL" },
  ];

  etnik = [
    { U_Etnik_ID: "1100", Etnik: "Melayu", U_Bangsa_ID: "1" },
    { U_Etnik_ID: "2111", Etnik: "Negrito - Bateq", U_Bangsa_ID: "2" },
    { U_Etnik_ID: "2112", Etnik: "Negrito - Jahai", U_Bangsa_ID: "2" },
    { U_Etnik_ID: "2113", Etnik: "Negrito - Kensiu", U_Bangsa_ID: "2" },
    { U_Etnik_ID: "2114", Etnik: "Negrito - Kintak", U_Bangsa_ID: "2" },
    { U_Etnik_ID: "2115", Etnik: "Negrito - Ianoh", U_Bangsa_ID: "2" },
    { U_Etnik_ID: "2116", Etnik: "Negrito - Mendriq", U_Bangsa_ID: "2" },
    { U_Etnik_ID: "2121", Etnik: "Senoi - Che Wong", U_Bangsa_ID: "2" },
    { U_Etnik_ID: "2122", Etnik: "Senoi - Jahut", U_Bangsa_ID: "2" },
    { U_Etnik_ID: "2123", Etnik: "Senoi - Mah Meri", U_Bangsa_ID: "2" },
    { U_Etnik_ID: "2124", Etnik: "Senoi - Semai", U_Bangsa_ID: "2" },
    { U_Etnik_ID: "2125", Etnik: "Senoi - Semoq Beri", U_Bangsa_ID: "2" },
    { U_Etnik_ID: "2126", Etnik: "Senoi - Temiar", U_Bangsa_ID: "2" },
    { U_Etnik_ID: "2131", Etnik: "Melayu Asli - Jakun", U_Bangsa_ID: "2" },
    {
      U_Etnik_ID: "2132",
      Etnik: "Melayu Asli - Prang Kanaq",
      U_Bangsa_ID: "2",
    },
    {
      U_Etnik_ID: "2133",
      Etnik: "Melayu Asli - Orang Kuala",
      U_Bangsa_ID: "2",
    },
    {
      U_Etnik_ID: "2134",
      Etnik: "Melayu Asli - Orang Seletar",
      U_Bangsa_ID: "2",
    },
    { U_Etnik_ID: "2135", Etnik: "Melayu Asli - Semalai", U_Bangsa_ID: "2" },
    { U_Etnik_ID: "2136", Etnik: "Melayu Asli - Temuan", U_Bangsa_ID: "2" },
    { U_Etnik_ID: "3110", Etnik: "Bajau", U_Bangsa_ID: "3" },
    { U_Etnik_ID: "3120", Etnik: "Balbak/Molbog", U_Bangsa_ID: "3" },
    { U_Etnik_ID: "3130", Etnik: "Bisaya/Bisayah", U_Bangsa_ID: "3" },
    { U_Etnik_ID: "3140", Etnik: "Bulongan", U_Bangsa_ID: "3" },
    { U_Etnik_ID: "3150", Etnik: "Dusun", U_Bangsa_ID: "3" },
    { U_Etnik_ID: "3160", Etnik: "Idahan/Ida'an", U_Bangsa_ID: "3" },
    { U_Etnik_ID: "3170", Etnik: "Iranun/Ilanun", U_Bangsa_ID: "3" },
    { U_Etnik_ID: "3180", Etnik: "Kadayan/Kedayan", U_Bangsa_ID: "3" },
    { U_Etnik_ID: "3190", Etnik: "Kadazan", U_Bangsa_ID: "3" },
    { U_Etnik_ID: "3200", Etnik: "Lundayuh/Lundayeh", U_Bangsa_ID: "3" },
    { U_Etnik_ID: "3210", Etnik: "Melayu Brunei", U_Bangsa_ID: "3" },
    { U_Etnik_ID: "3220", Etnik: "Murut", U_Bangsa_ID: "3" },
    { U_Etnik_ID: "3230", Etnik: "Orang Sungai/Sungoi", U_Bangsa_ID: "3" },
    { U_Etnik_ID: "3240", Etnik: "Rungus", U_Bangsa_ID: "3" },
    { U_Etnik_ID: "3250", Etnik: "Suluk", U_Bangsa_ID: "3" },
    { U_Etnik_ID: "3260", Etnik: "Tidung", U_Bangsa_ID: "3" },
    { U_Etnik_ID: "3998", Etnik: "Bumiputera Sabah Lain", U_Bangsa_ID: "3" },
    { U_Etnik_ID: "4110", Etnik: "Bidayuh", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4120", Etnik: "Bisayah (Sarawak)", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4130", Etnik: "Bukitan", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4140", Etnik: "Iban", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4150", Etnik: "Kadayan (Sarawak)", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4160", Etnik: "Kajang", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4170", Etnik: "Kanowit", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4180", Etnik: "Kayan", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4190", Etnik: "Kejaman", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4200", Etnik: "Kalabit", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4210", Etnik: "Kenyah", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4220", Etnik: "Iahanan", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4230", Etnik: "Lisum", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4240", Etnik: "Lugat", U_Bangsa_ID: "4" },
    {
      U_Etnik_ID: "4250",
      Etnik: "Lun Bawang/Murut (Sarawak)",
      U_Bangsa_ID: "4",
    },
    { U_Etnik_ID: "4260", Etnik: "Melanau", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4270", Etnik: "Penan", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4280", Etnik: "Punan", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4290", Etnik: "Sabup", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4300", Etnik: "Sekapan", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4310", Etnik: "Sian", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4320", Etnik: "Sipeng", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4330", Etnik: "Tabun", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4340", Etnik: "Tagal", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4350", Etnik: "Tanjong", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4360", Etnik: "Ukit", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "4998", Etnik: "Bumiputera Sarawak Lain", U_Bangsa_ID: "4" },
    { U_Etnik_ID: "5110", Etnik: "Foochow", U_Bangsa_ID: "5" },
    { U_Etnik_ID: "5120", Etnik: "Hainan", U_Bangsa_ID: "5" },
    { U_Etnik_ID: "5130", Etnik: "Henghua", U_Bangsa_ID: "5" },
    { U_Etnik_ID: "5140", Etnik: "Hokchia", U_Bangsa_ID: "5" },
    { U_Etnik_ID: "5150", Etnik: "Hokchiu", U_Bangsa_ID: "5" },
    { U_Etnik_ID: "5160", Etnik: "Hookien", U_Bangsa_ID: "5" },
    { U_Etnik_ID: "5170", Etnik: "Kantonis", U_Bangsa_ID: "5" },
    { U_Etnik_ID: "5180", Etnik: "Khek (Hakka)", U_Bangsa_ID: "5" },
    { U_Etnik_ID: "5190", Etnik: "Kwongsai", U_Bangsa_ID: "5" },
    { U_Etnik_ID: "5200", Etnik: "Teochew", U_Bangsa_ID: "5" },
    { U_Etnik_ID: "5998", Etnik: "Orang Cina Lain", U_Bangsa_ID: "5" },
    { U_Etnik_ID: "6110", Etnik: "India Muslim/Malabari", U_Bangsa_ID: "6" },
    { U_Etnik_ID: "6120", Etnik: "Malayali", U_Bangsa_ID: "6" },
    { U_Etnik_ID: "6130", Etnik: "Punjabi (Kecuali Sikh)", U_Bangsa_ID: "6" },
    { U_Etnik_ID: "6140", Etnik: "Sikh", U_Bangsa_ID: "6" },
    { U_Etnik_ID: "6150", Etnik: "Sinhala", U_Bangsa_ID: "6" },
    { U_Etnik_ID: "6160", Etnik: "Tamil India", U_Bangsa_ID: "6" },
    { U_Etnik_ID: "6170", Etnik: "Tamil Sri Lanka", U_Bangsa_ID: "6" },
    { U_Etnik_ID: "6180", Etnik: "Telugu", U_Bangsa_ID: "6" },
    { U_Etnik_ID: "6998", Etnik: "Orang India Lain", U_Bangsa_ID: "6" },
    { U_Etnik_ID: "7000", Etnik: "Lain-Lain", U_Bangsa_ID: "7" },
  ];

  parlimen: any;
  dun: any;
  kampung: any;
  seksyen: any;
  kategoriUsahawan: any;
  pusatTanggungjawab: any;

  constructor(
    private usahawanService: UsahawanService,
    private loginService: LoginService,
    private router: Router,
    private user: LoginModel,
    public usahawan: UsahawanModel,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    public alertController: AlertController,
    private negeriService: NegeriService,
    private daerahService: DaerahService,
    private mukimService: MukimService,
    private parlimenService: ParlimenService,
    private dunService: DunService,
    private kampungService: KampungService,
    private seksyenService: SeksyenService,
    private kategoriUsahawanService: KategoriUsahawanService,
    private ptService: PusatTanggungjawabService,
    private aliranService: AliranService
  ) {
    this.form = this.formBuilder.group({
      Kod_PT: [""],
      namausahawan: [""],
      nokadpengenalan: [""],
      tarikhlahir: [""],
      U_Jantina_ID: ["", Validators.required],
      U_Bangsa_ID: ["", Validators.required],
      U_Etnik_ID: ["", Validators.required],
      statusperkahwinan: ["", Validators.required],
      U_Pendidikan_ID: ["", Validators.required],
      U_Taraf_Pendidikan_Tertinggi_ID: ["", Validators.required],
      alamat1: ["", Validators.required],
      alamat2: ["", Validators.required],
      alamat3: ["", Validators.required],
      bandar: ["", Validators.required],
      poskod: ["", Validators.required],
      U_Negeri_ID: ["", Validators.required],
      U_Daerah_ID: ["", Validators.required],
      U_Mukim_ID: ["", Validators.required],
      U_Parlimen_ID: ["", Validators.required],
      U_Dun_ID: ["", Validators.required],
      U_Kampung_ID: [""],
      U_Seksyen_ID: [""],
      id_kategori_usahawan: [""],
      gambar_url: [""],
      notelefon: [""],
      nohp: [""],
      email: ["", Validators.required],
      status_daftar_usahawan: [""],
      usahawanid: [""],
      negeri_perniagaan: [""],
    });
  }

  6;

  ngOnInit() {
    this.usahawan_id = window.sessionStorage.getItem("usahawan_id");
    this.user_id = window.sessionStorage.getItem("user_id");

    // var getsession_id = window.sessionStorage.getItem("user_id");
    console.log("usahawan id", this.usahawan_id);
    console.log("user id", this.user_id);
    this.getUsahawan();
    this.etnikTemp = this.etnik;
    console.log("etnik", this.etnikTemp);
  }

  setFormValues() {
    this.form.patchValue({
      Kod_PT: this.usahawan.Kod_PT,
      namausahawan: this.usahawan.namausahawan,
      nokadpengenalan: this.usahawan.nokadpengenalan,
      // tarikhlahir: this.usahawan.tarikhlahir,
      U_Jantina_ID: this.usahawan.U_Jantina_ID,
      U_Bangsa_ID: this.usahawan.U_Bangsa_ID,
      U_Etnik_ID: this.usahawan.U_Etnik_ID,
      statusperkahwinan: this.usahawan.statusperkahwinan,
      U_Pendidikan_ID: this.usahawan.U_Pendidikan_ID,
      U_Taraf_Pendidikan_Tertinggi_ID:
        this.usahawan.U_Taraf_Pendidikan_Tertinggi_ID,
      alamat1: this.usahawan.alamat1,
      alamat2: this.usahawan.alamat2,
      alamat3: this.usahawan.alamat3,
      bandar: this.usahawan.bandar,
      poskod: this.usahawan.poskod,
      U_Negeri_ID: this.usahawan.U_Negeri_ID,
      U_Daerah_ID: this.usahawan.U_Daerah_ID,
      U_Mukim_ID: this.usahawan.U_Mukim_ID,
      U_Parlimen_ID: this.usahawan.U_Parlimen_ID,
      U_Dun_ID: this.usahawan.U_Dun_ID,
      U_Kampung_ID: this.usahawan.U_Kampung_ID,
      U_Seksyen_ID: this.usahawan.U_Seksyen_ID,
      id_kategori_usahawan: this.usahawan.id_kategori_usahawan,
      gambar_url: this.usahawan.gambar_url,
      notelefon: this.usahawan.notelefon,
      nohp: this.usahawan.nohp,
      email: this.usahawan.email,
      status_daftar_usahawan: this.usahawan.status_daftar_usahawan,
      usahawanid: this.usahawan.usahawanid,
    });

    if (this.usahawan.perniagaan.negeri != null) {
      this.form.patchValue({
        negeri_perniagaan: this.usahawan.perniagaan.negeri.Negeri,
      });
    }
  }

  etnikTemp = [];
  filterEtnik() {
    this.form.patchValue({
      U_Etnik_ID: "",
    });

    this.etnikTemp = [];
    this.etnik.forEach((element) => {
      if (element.U_Bangsa_ID == this.form.value.U_Bangsa_ID) {
        this.etnikTemp.push(element);
      }
    });

    console.log("etnik", this.etnikTemp);
  }

  async getUsahawan() {
    // console.log(this.form.value);
    const loading = await this.loadingController.create({
      message: "Loading ...",
    });
    loading.present();
    this.usahawanService.show(this.usahawan_id).subscribe((res) => {
      console.log("usahawan info", res);

      this.form.patchValue({
        namausahawan: res.namausahawan,
        nokadpengenalan: res.nokadpengenalan,
      });
      loading.dismiss();

      if (Object.keys(res).length === 0) {
        console.log("failed");
        loading.dismiss();
      } else {
        this.usahawan = res;

        console.log("profile usahawan success");
        this.getPT();

        // this.calcBirthDate()

        this.getUser();
        this.getKategoriUsahawan();
        this.calcBirthDate();

        this.negeriService.get().subscribe((resNegeri) => {
          console.log("Negeri", resNegeri);
          this.negeri = resNegeri;

          this.daerahService
            .get()
            .pipe(
              map((x) =>
                x.filter((i) => i.U_Negeri_ID == this.usahawan.U_Negeri_ID)
              )
            )
            .subscribe((resDaerah) => {
              console.log("resDaerah", resDaerah);
              this.daerah = resDaerah;

              this.mukimService
                .get()
                .pipe(
                  map((x) =>
                    x.filter((i) => i.U_Daerah_ID == this.usahawan.U_Daerah_ID)
                  )
                )
                .subscribe((resMukim) => {
                  console.log("resMukim", resMukim);
                  this.mukim = resMukim;

                  this.parlimenService
                    .get()
                    .pipe(
                      map((x) =>
                        x.filter(
                          (i) => i.U_Negeri_ID == this.usahawan.U_Negeri_ID
                        )
                      )
                    )
                    .subscribe((resParlimen) => {
                      console.log("resParlimen", resParlimen);
                      this.parlimen = resParlimen;

                      this.dunService
                        .get()
                        .pipe(
                          map((x) =>
                            x.filter(
                              (i) =>
                                i.U_Parlimen_ID == this.usahawan.U_Parlimen_ID
                            )
                          )
                        )
                        .subscribe((resDun) => {
                          console.log("resDun", resDun);
                          this.dun = resDun;

                          this.kampungService
                            .get()
                            .pipe(
                              map((x) =>
                                x.filter(
                                  (i) =>
                                    i.U_Mukim_ID == this.usahawan.U_Mukim_ID
                                )
                              )
                            )
                            .subscribe((resKampung) => {
                              console.log("resKampung", resKampung);
                              this.kampung = resKampung;

                              let mukimStr = this.usahawan.U_Mukim_ID;
                              // let mukimInt = parseInt(mukimStr.toString())
                              // console.log("mukim temp", typeof mukimInt);
                              // console.log("mukim temp", mukimInt);
                              this.seksyenService
                                .get()
                                .pipe(
                                  map((x) =>
                                    x.filter((i) => i.U_Mukim_ID == mukimStr)
                                  )
                                )
                                .subscribe((resSeksyen) => {
                                  console.log("resSeksyen", resSeksyen);
                                  this.seksyen = resSeksyen;

                                  this.setFormValues();

                                  loading.dismiss();
                                });
                            });
                        });
                    });
                });
            });
        });
      }
    });
  }

  getUser() {
    // console.log(this.form.value);
    this.loginService.show(this.user_id).subscribe((res) => {
      // console.log("user info", res);

      if (Object.keys(res).length === 0) {
        console.log("failed");
      } else {
        this.user = res;
        console.log("user info", this.user);
        console.log("profile usahawan success");
      }

      this.getAliranJualan();
    });
  }

  getPT() {
    this.ptService
      .get()
      .pipe(map((x) => x.filter((i) => i.Kod_PT == this.usahawan.Kod_PT)))
      .subscribe((res) => {
        // console.log("pt", res);
        this.pusatTanggungjawab = res[0].keterangan;
        console.log("pt", this.pusatTanggungjawab);
      });
  }

  getNegeri() {
    this.negeriService.get().subscribe((res) => {
      console.log("negeri", res);
      this.negeri = res;
    });
  }

  getDaerah() {
    this.daerahService
      .get()
      .pipe(
        map((x) =>
          x.filter((i) => i.U_Negeri_ID == this.form.value.U_Negeri_ID)
        )
      )
      .subscribe((res) => {
        console.log("Daerah", res);
        this.daerah = res;
      });
  }

  getMukim() {
    this.mukimService
      .get()
      .pipe(
        map((x) =>
          x.filter((i) => i.U_Daerah_ID == this.form.value.U_Daerah_ID)
        )
      )
      .subscribe((res) => {
        console.log("mukim", res);
        this.mukim = res;
      });
  }

  getParlimen() {
    this.parlimenService
      .get()
      .pipe(
        map((x) =>
          x.filter((i) => i.U_Negeri_ID == this.form.value.U_Negeri_ID)
        )
      )
      .subscribe((res) => {
        console.log("parlimen", res);
        this.parlimen = res;
      });
  }

  getDun() {
    this.dunService
      .get()
      .pipe(
        map((x) =>
          x.filter((i) => i.U_Parlimen_ID == this.form.value.U_Parlimen_ID)
        )
      )
      .subscribe((res) => {
        console.log("dun", res);
        this.dun = res;
      });
  }

  getKampung() {
    this.kampungService
      .get()
      .pipe(
        map((x) => x.filter((i) => i.U_Mukim_ID == this.form.value.U_Mukim_ID))
      )
      .subscribe((res) => {
        console.log("kampung", res);
        this.kampung = res;
      });
  }

  getSeksyen() {
    console.log(this.form.value.U_Mukim_ID);
    let mukim = parseInt(this.form.value.U_Mukim_ID);
    // console.log("mukim temp",typeof this.form.value.U_Mukim_ID);
    this.seksyenService
      .get()
      .pipe(map((x) => x.filter((i) => i.U_Mukim_ID == mukim)))
      .subscribe((res) => {
        console.log("seksyen", res);
        this.seksyen = res;
      });
  }

  getKategoriUsahawan() {
    this.kategoriUsahawanService.get().subscribe((res) => {
      console.log("kategori usahawan", res);
      this.kategoriUsahawan = res;
    });
  }

  getAliranJualan() {
    this.aliranService
      .get(this.user_id)
      .pipe(
        map((x) => x.filter((i) => i.kategori_aliran == "JUALAN/PEROLEHAN"))
      )
      .subscribe((res) => {
        console.log("aliran", res);

        let sum = 0;
        res.forEach((element) => {
          sum += element.jumlah_aliran;
        });

        if (sum < 60000) {
          //pico
          this.form.patchValue({
            id_kategori_usahawan: "KU01",
          });
        } else if (sum >= 60000 && sum < 150000) {
          // nano
          this.form.patchValue({
            id_kategori_usahawan: "KU02",
          });
        } else if (sum >= 150000 && sum < 300000) {
          //micro
          this.form.patchValue({
            id_kategori_usahawan: "KU03",
          });
        } else if (sum >= 300000 && sum < 15000000) {
          //kecil
          this.form.patchValue({
            id_kategori_usahawan: "KU04",
          });
        } else if (sum >= 300000 && sum < 15000000) {
          // sederhana
          this.form.patchValue({
            id_kategori_usahawan: "KU05",
          });
        }
        console.log("sum", sum);
      });
  }

  tarikhlahir: any;

  calcBirthDate() {
    let year = this.usahawan.nokadpengenalan.substring(0, 2);
    let month = this.usahawan.nokadpengenalan.substring(2, 4);
    let date = this.usahawan.nokadpengenalan.substring(4, 6);

    if (Number(year) > 40) {
      year = 19 + year;
    } else {
      year = 20 + year;
    }
    let birthday = date + "/" + month + "/" + year;

    console.log("birthday", birthday);
    const datepipe: DatePipe = new DatePipe("en-US");
    this.form.patchValue({
      tarikhlahir: moment(birthday).format("YYYY-MM-DD"),
    });
    this.tarikhlahir = birthday;
  }

  async logForm() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "",
      message: "Adakah anda setuju untuk menyimpan perubahan ini?",
      buttons: [
        {
          text: "Tidak",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
            this.setFormValues();
          },
        },
        {
          text: "Ya",
          handler: async () => {
            console.log("Confirm Okay");
            console.log("Confirm Okay", this.form.value);

            const loading = await this.loadingController.create({
              message: "Loading ...",
            });
            loading.present();

            this.form.value.gambar_url = this.usahawan.gambar_url;
            console.log(this.form.value);

            this.usahawanService
              .update(this.usahawan_id, this.form.value)
              .subscribe((res) => {
                console.log("updated", res);

                this.getUser();

                loading.dismiss();

                this.presentAlert();
              });
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Kemaskini Berjaya",
      subHeader: "Kemaskini Maklumat Usahawan Telah Berjaya",
      message: "",
      buttons: ["OK"],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log("onDidDismiss resolved with role", role);
  }

  url: any;
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.url = event.target.result;
        this.usahawan.gambar_url = this.url;
      };

      this.fileEvent(event);
    }
  }

  // Convert the base64 to blob data
  // and create  formData with it

  images: LocalFile[];
  async fileEvent(e) {
    this.images = [];

    const files = e.target.files;
    const file = files[0];
    const filePath = files[0].size;
    const base64Data = await this.readAsBase64(file);

    const fileName = new Date().getTime() + ".jpeg";

    this.images.push({
      name: fileName,
      path: filePath,
      data: filePath,
    });

    console.log("AAAA", this.images);
  }

  // https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
  private async readAsBase64(blob) {
    // Fetch the photo, read as a blob, then convert to base64 format
    // const response = await fetch(photo.webPath);
    // const blob = await response.blob();

    return (await this.convertBlobToBase64(blob)) as string;
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  async presentAlertUpdateProfile() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Ralat",
      // subHeader: 'Subtitle',
      message: "Sila kamaskini profil anda terlebih dahulu",
      buttons: [
        {
          text: "Okay",
          // id: 'confirm-button',
          handler: () => {
            // this.router.navigate(['/dashboard'])
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log("onDidDismiss resolved with role", role);
  }

  reset() {
    this.form.patchValue({
      U_Daerah_ID: null,
      U_Mukim_ID: null,
      U_Parlimen_ID: null,
      U_Dun_ID: null,
      U_Kampung_ID: null,
      U_Seksyen_ID: null,
    });
  }

  reset2() {
    this.form.patchValue({
      U_Kampung_ID: null,
      U_Seksyen_ID: null,
    });
  }

  dashboard() {
    this.router.navigate(["/dashboard"]);
  }
  back() {
    // if (this.user.profile_status == 0) {
    //   this.presentAlertUpdateProfile();
    // } else {
    //   this.router.navigateByUrl("dashboard");
    // }
  }
}
