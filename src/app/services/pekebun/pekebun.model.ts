import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})


export class PekebunModel {

    public usahawanid: Number;
    public status_daftar_usahawan: String;
    public Nama_PK: String;
    public No_KP: String;
    public Tsmohon_No: Number;
    public No_Geran: Number;
    public No_Lot: Number;

    public U_Negeri_ID: Number;
    public U_Daerah_ID: Number;
    public U_Mukim_ID: Number;
    public U_Parlimen_ID: Number;
    public U_Dun_ID: Number;
    public U_Kampung_ID: Number;
    public U_Seksyen_ID: Number;
    public keluasan_hektar: Number;
    public jenis_tanaman_kebun: String;
  id: any;

}