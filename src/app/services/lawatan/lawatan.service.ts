import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LawatanService {

  url: string = environment.baseUrl + "api/lawatan";

  constructor(private http: HttpClient) { }

  post(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}`, data);
  }

  get(pegawai_id): Observable<any> {
    return this.http.get<any>(`${this.url}`+'/'+pegawai_id);
  }

  url2 : string = environment.baseUrl + "api/lawatan/usahawan";
  getLawatanUsahawan(id_pengguna): Observable<any> {
    return this.http.get<any>(`${this.url2}`+'/'+id_pengguna);
  }

  update(data: any, id): Observable<any> {
    return this.http.put<any>(`${this.url}` +'/'+id, data);
  }

  url3 : string = environment.baseUrl + "api/tindakanLawatan";
  getTindakanLawatan(): Observable<any> {
    return this.http.get<any>(`${this.url3}`);
  }


  url4 : string = environment.baseUrl + "api/lawatan/updateLaporan";
  updateLaporan(data: any, id): Observable<any> {
    return this.http.post<any>(`${this.url4}`+'/'+id, data);
  }


  url5 : string = environment.baseUrl + "api/lawatan/senaraiUsahawan"
  getsenaraiusahawan(id_pegawai): Observable<any> {
    return this.http.get<any>(`${this.url5}`+'/'+id_pegawai);
  }


  tambahLaporan(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}`+'/laporanBaru', data);
  }

  janaLaporan(id): Observable<any> {
    return this.http.get<any>(`${this.url}`+'/janaDokumenLawatan/'+id);
  }

}
