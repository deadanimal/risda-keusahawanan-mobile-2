import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  url: string = environment.baseUrl + "api/forgot-password";

  constructor(private http: HttpClient) { }


  post(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}`, data);
  }

  url2: string = environment.baseUrl + "api/update-email-password/";
  firstTimeLogin(data: any, id): Observable<any> {
    return this.http.post<any>(`${this.url2}` + id, data);
  }

  url3: string = environment.baseUrl + "api/updatePassword/";
  updatePassword(data: any, id): Observable<any> {
    return this.http.post<any>(`${this.url3}` + id, data);
  }

}
