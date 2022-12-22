import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})


export class UsahawanModel {

  public Kod_PT: Number;
  public namausahawan: string;
  public nokadpengenalan: string;
  public tarikhlahir: Date;
  public U_Jantina_ID: Number;
  public U_Bangsa_ID: Number;
  public statusperkahwinan: string;
  public U_Pendidikan_ID: Number;
  public alamat1: string;
  public alamat2: string;
  public alamat3: string;
  public bandar: string;
  public poskod: string;
  public U_Negeri_ID: Number;
  public U_Daerah_ID: Number;
  public U_Mukim_ID: Number;
  public U_Parlimen_ID: Number;
  public U_Dun_ID: Number;
  public U_Kampung_ID: Number;
  public U_Seksyen_ID: Number;
  public id_kategori_usahawan: Number;
  public gambar_url: String;
  public notelefon: string;
  public nohp: string;
  public email: string;
  public createdby_id: Number;
  public createdby_kod_PT: Number;
  public modifiedby_id: Number;
  public modifiedby_kod_PT: Number;
  status_daftar_usahawan: any;
  usahawanid: any;
  negeri_perniagaan: any;
  U_Etnik_ID: any;
  U_Taraf_Kelulusan_Tertinggi_ID: any;
  U_Taraf_Pendidikan_Tertinggi_ID: any;
  perniagaan: any;
}