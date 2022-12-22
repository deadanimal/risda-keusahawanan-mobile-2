import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuletinService {

  url: string = environment.baseUrl + "api/buletin";

  constructor(private http: HttpClient) { }

  post(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}`, data);
  }

  get(pegawai_id): Observable<any> {
    return this.http.get<any>(`${this.url}` + "/" + pegawai_id);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.url}`);
  }

  update(data: any, id): Observable<any> {
    return this.http.put<any>(
      `${this.url}/${id}`, data
    );
  }

  // delete(aliran_id: number): Observable<any> {
  //   return this.http.delete<any>(
  //     `${this.url}/${aliran_id}`
  //   );
  // }
}
