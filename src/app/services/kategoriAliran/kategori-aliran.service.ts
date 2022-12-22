import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class KategoriAliranService {

  url: string = environment.baseUrl + "api/kategori_aliran";

  constructor(private http: HttpClient) { }

  getKategoriAliran(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}`);
  }

}
