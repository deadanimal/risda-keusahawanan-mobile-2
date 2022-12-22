import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StokService {

  url: string = environment.baseUrl + "api/stok";

  constructor(private http: HttpClient) { }

  post(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}`, data);
  }

  getStokKatalog(): Observable<any> {
    return this.http.get<any>(`${this.url}`);
  }

  get(id): Observable<any> {
    return this.http.get<any>(`${this.url}` + '/' + id);
  }

  update(data: any, id): Observable<any> {
    return this.http.put<any>(
      `${this.url}/${id}`, data
    );
  }

  delete(id): Observable<any> {
    return this.http.delete<any>(
      `${this.url}/${id}`
    );
  }

  url2 : string = environment.baseUrl + "api/deleteStok";
  deleteMany(id_pelanggan): Observable<any> {
    return this.http.get<any>(
      `${this.url2}/${id_pelanggan}`
    );
  }
}
