import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class KatalogService {
  url: string = environment.baseUrl + "api/katalog";

  constructor(private http: HttpClient) {}

  post(data: any, file: File): Observable<any> {
    const formdata: FormData = new FormData();
    for (let key in data) {
      formdata.append(key, data[key]);
    }
    return this.http.post<any>(`${this.url}`, formdata);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.url}`);
  }

  get(user_id): Observable<any> {
    return this.http.get<any>(`${this.url}` + "/" + user_id);
  }

  update(aliran: any, file: File): Observable<any> {
    console.log(aliran);

    const formData = new FormData();
    for (let key in aliran) {
      formData.append(key, aliran[key]);
    }
    formData.append("_method", "PUT");
    if (file) {
      formData.append("gambar_url", file, file.name);
    }
    console.log("aliran id = " + aliran.id);
    const headers = new HttpHeaders({ enctype: "multipart/form-data" });

    return this.http.post<any>(`${this.url}/${aliran.id}`, formData);
  }

  delete(aliran_id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${aliran_id}`);
  }

  url2: string = environment.baseUrl + "api/katalogPegawai";
  getKatalogPegawai(id): Observable<any> {
    return this.http.get<any>(`${this.url2}` + "/" + id);
  }

  url3: string = environment.baseUrl + "api/pengesahanPegawai";
  pengesahanPegawai(id): Observable<any> {
    return this.http.get<any>(`${this.url3}` + "/" + id);
  }

  katalogPdf(id): Observable<any> {
    return this.http.get<any>(`${this.url}` + "/katalogPdf/" + id);
  }

  getMaklumatUsahawan(id): Observable<any> {
    return this.http.get<any>(`${this.url}` + "/showMaklumatUsahawan/" + id);
  }

  url4: string = environment.baseUrl + "api/katalogdashboard";
  katalogdashboard(): Observable<any> {
    return this.http.get<any>(`${this.url4}`);
  }
}
