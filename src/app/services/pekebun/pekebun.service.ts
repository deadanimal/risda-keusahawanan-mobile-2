import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { PekebunModel } from './pekebun.model';
@Injectable({
  providedIn: 'root'
})
export class PekebunService {

  url: string = environment.baseUrl + "api/pekebun";

  public models: PekebunModel[] = [];
  public model: PekebunModel;

  constructor(private http: HttpClient) { }

  show(id): Observable<any> {
    return this.http.get<any>(`${this.url}` + "/" + id);
  }

  update(data: any, id): Observable<any> {
    return this.http.put<any>(
      `${this.url}/${id}`, data
    );
  }


  getPekebunEpek(nokp): Observable<any> {
    return this.http.get<any>(`${this.url}` + "/getPekebunEspek/" + nokp);
  }

  getNoTS(nokp): Observable<any> {
    return this.http.get<any>(`${this.url}` + "/getNoTS/" + nokp);
  }



  url2: string = environment.baseUrl + "api/tanah";

  updateTanah(data: any, pekebun_id): Observable<any> {
    return this.http.put<any>(
      `${this.url2}/${pekebun_id}`, data
    );
  }

  deleteTanah(pekebun_id): Observable<any> {
    return this.http.delete<any>(
      `${this.url2}/${pekebun_id}`
    );
  }


  url3: string = environment.baseUrl + "api/tanaman";

  updateTanaman(data: any, tanah_id): Observable<any> {
    return this.http.put<any>(
      `${this.url3}/${tanah_id}`, data
    );
  }

  deleteTanaman(tanah_id): Observable<any> {
    return this.http.delete<any>(
      `${this.url3}/${tanah_id}`
    );
  }
}
