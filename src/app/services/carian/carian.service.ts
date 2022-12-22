import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarianService {

  url: string = environment.baseUrl + "api/carian";

  constructor(private http: HttpClient) { }

  get(input): Observable<any> {
    return this.http.get<any>(`${this.url}`+'/'+input);
  }

  url2: string = environment.baseUrl + "api/downloadCarian";

  downloadFile(id): Observable<any> {
    return this.http.get<any>(`${this.url2}`+'/'+id);
  }

  url3: string = environment.baseUrl + "api/cari";
  cariUsahawan(data: any): Observable<any> {
    return this.http.post<any>(`${this.url3}`, data);
  }

  page(url,data: any): Observable<any> {
    return this.http.post<any>(url, data);
  }
}
