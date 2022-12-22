import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})


export class LoginModel {
    public id: string;
    public email: string;
    public name: string;
    public no_kp: string;
    public usahawanid: Number;
    public idpegawai: Number;
    public status_pengguna: boolean;
  profile_status: any;
}