import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AliranService {

  url: string = environment.baseUrl + "api/aliran";

  constructor(private http: HttpClient) { }

  post(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}`, data);
  }

  get(id): Observable<any> {
    return this.http.get<any>(`${this.url}`+'/'+id);
  }

  update(aliran: any, aliran_id: number,): Observable<any> {
    return this.http.put<any>(
      `${this.url}/${aliran_id}`, aliran
    );
  }

  delete( aliran_id: number ): Observable<any>{
    return this.http.delete<any>(
      `${this.url}/${aliran_id}`
    );
  }

  uploadDoc(data: any, id): Observable<any> {
    return this.http.post<any>(
      `${this.url}` + "/uploadDoc/" + id, data
    );
  }

  getTotalYear(id): Observable<any> {
    return this.http.get<any>(
      `${this.url}` + "/getYear/" + id
    );
  }

  getTotalMonth(id): Observable<any> {
    return this.http.get<any>(
      `${this.url}` + "/getMonth/" + id
    );
  }
}
