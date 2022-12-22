import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotifikasiService {

  url: string = environment.baseUrl + "api/notifikasi";

  constructor(
    private http: HttpClient,

    ) { }

  get(id): Observable<any> {
    return this.http.get<any>(`${this.url}`+'/'+id);
  }

  updateStatus(id): Observable<any> {
    return this.http.get<any>(`${this.url}`+'/updateStatus/'+id);
  }
}
