import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})


export class SyarikatModel {


    public usahawanid: Number;
    public namasyarikat: String;
    public jenismilikanperniagaan: String;
    public nodaftarssm: String;
    public nodaftarpbt: String;
    public nodaftarpersijilanhalal: String;
    public nodaftarmesti: String;
    public tahunmulaoperasi: String;
    public bilanganpekerja: String;
    public alamat1_ssm: String;
    public alamat2_ssm: String;
    public alamat3_ssm: String;
    public tarikh_mula_mof: Date;
    public tarikh_tamat_mof: Date;
    public status_bumiputera: Number;
    public tarikh_daftar_ssm: Date;
    public notelefon: string;
    public no_hp: string;
    public email: string;
    public logo_syarikat: string;
    public prefix_id: Number;
    public createdby_id: Number;
    public createdby_kod_PT: Number;
    public modifiedby_id: Number;
    public modifiedby_kod_PT: Number;
  id: any;
  Kod_PT: any;
  syarikat_id: any;
  nama_akaun_bank: any;
  no_akaun_bank: any;
}