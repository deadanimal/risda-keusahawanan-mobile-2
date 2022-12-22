import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdukService {

  url: string = environment.baseUrl + "api/produk";

  // public models: PerniagaanModel[] = [];
  // public model: PerniagaanModel;

  constructor(private http: HttpClient) { }


  get(id): Observable<any> {
    return this.http.get<any>(`${this.url}` + "/" + id);
  }

  update(data: any, id): Observable<any> {
    return this.http.put<any>(
      `${this.url}/${id}`, data
    );
  }

  post(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.url}`, data
    );
  }

  delete(produk_id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.url}/${produk_id}`
    );
  }
  
}
