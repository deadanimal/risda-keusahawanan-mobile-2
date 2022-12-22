import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PusatTanggungjawabService {

  url: string = environment.baseUrl + "api/pusat_tanggungjawab";

  constructor(private http: HttpClient) { }

  // post(data: any): Observable<any> {
  //   return this.http.post<any>(`${this.url}`, data);
  // }

  get(): Observable<any> {
    return this.http.get<any>(`${this.url}`);
  }

  getNegeriPt(id): Observable<any> {
    return this.http.get<any>(`${this.url}` + '/senarai_pt_pun_pud/' + id);
  }
}
