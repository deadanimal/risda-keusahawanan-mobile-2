import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})


export class PerniagaanModel {


    public usahawanid: Number;
    public jenisperniagaan: String;
    public klusterperniagaan: String;
    public subkluster: String;
    public alamat1: String;
    public alamat2: String;
    public alamat3: String;
    public bandar: String;
    public poskod: String;
    public U_Negeri_ID: Number;
    public U_Daerah_ID: Number;
    public U_Mukim_ID: Number;
    public U_Parlimen_ID: Number;
    public U_Dun_ID: Number;
    public U_Kampung_ID: Number;
    public U_Seksyen_ID: Number;
    public latitud: Number;
    public logitud: Number;
    public facebook: String;
    public instagram: String;
    public twitter: String;
    public lamanweb: String;
    public dropship: String;
    public ejen: String;
    public outlet: String;
    public stokis: String;
    public luarnegara: String;
    public domestik: String;
    public pasaranonline: String;
    public purata_jualan_bulanan: String;
    public hasil_jualan_tahunan: String;
    // public domestik: String;
    // public domestik: String;


    public logo_syarikat: String;
    public createdby_id: Number;
    public createdby_kod_PT: Number;
    public modifiedby_id: Number;
    public modifiedby_kod_PT: Number;
  peratus_kenaikan: any;
}