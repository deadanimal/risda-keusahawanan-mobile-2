import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MukimService {

  
  url: string = environment.baseUrl + "api/mukim";

  constructor(private http: HttpClient) { }

  // post(data: any): Observable<any> {
  //   return this.http.post<any>(`${this.url}`, data);
  // }

  get(): Observable<any> {
    return this.http.get<any>(`${this.url}`);
  }
}
