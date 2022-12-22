import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { SyarikatModel } from './syarikat.model';
@Injectable({
  providedIn: 'root'
})
export class SyarikatService {

  url: string = environment.baseUrl + "api/syarikat";

  public models: SyarikatModel[] = [];
  public model: SyarikatModel;

  constructor(private http: HttpClient) { }

  // getUser(): Observable<SyarikatModel[]> {
  //   return this.http.get<SyarikatModel[]>(`${this.url}`);
  // }

  // check1user( user : SyarikatModel): Observable<SyarikatModel>{
  //   return this.http.post<SyarikatModel>(`${this.url}`,user);
  // }

  show(id): Observable<any> {
    return this.http.get<any>(`${this.url}` + "/" + id);
  }


  update(syarikat: any, usahawan_id): Observable<any> {
    return this.http.put<any>(
      `${this.url}/${usahawan_id}`, syarikat
    );
  }
}
