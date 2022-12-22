import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsentifService {

  url: string = environment.baseUrl + "api/insentif";

  constructor(private http: HttpClient) { }

  // post(data: any): Observable<any> {
  //   return this.http.post<any>(`${this.url}`, data);
  // }

  get(id): Observable<any> {
    return this.http.get<any>(`${this.url}`+'/'+id);
  }
}
