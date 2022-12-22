import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PekebunKecilService {

  constructor(private http: HttpClient) { }


  private postsURL = "https://www4.risda.gov.my/espek/portalpkprofiltanah/?nokp=";

  getPosts(data: any): Observable<any> {

    const username = "99891c082ecccfe91d99a59845095f9c47c4d14e";
    const password = "1cc11a9fec81dc1f99f353f403d6f5bac620aa8f";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/xml',
        'Authorization': 'Basic ' + btoa(username + ':' + password),
        'Access-Control-Allow-Origin': 'http://localhost:8100',
        'charset':'UTF-8'
      })


    };

    console.log(`${this.postsURL}` + data)
    console.log(httpOptions)
    return this.http.get<any>(`${this.postsURL}` + data, httpOptions);
  }
}
