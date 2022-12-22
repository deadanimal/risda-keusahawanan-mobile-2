import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { PerniagaanModel } from './perniagaan.model';

@Injectable({
  providedIn: 'root'
})
export class PerniagaanService {

  url: string = environment.baseUrl + "api/perniagaan";

  public models: PerniagaanModel[] = [];
  public model: PerniagaanModel;

  constructor(private http: HttpClient) { }

  // getUser(): Observable<PerniagaanModel[]> {
  //   return this.http.get<PerniagaanModel[]>(`${this.url}`);
  // }

  // check1user( user : PerniagaanModel): Observable<PerniagaanModel>{
  //   return this.http.post<PerniagaanModel>(`${this.url}`,user);
  // }

  show(id): Observable<any> {
    return this.http.get<any>(`${this.url}` + "/" + id);
  }


  update(perniagaan: any, usahawan_id): Observable<any> {
    return this.http.put<any>(
      `${this.url}/${usahawan_id}`, perniagaan
    );
  }
}
