import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PdfExcelService {
  url: string = environment.baseUrl + "api";

  constructor(private http: HttpClient) {}

  //buku tunai
  bukuTunaiExcel(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}` + "/bukuTunaiExcel/", data);
  }

  bukuTunaiPdf(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}` + "/bukuTunaiPDF/", data);
  }

  //pnl
  pnlExcel(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}` + "/pnlExcel/", data);
  }

  pnlPdf(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}` + "/pnlPdf/", data);
  }

  pnlInfo(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}` + "/calcPNL", data);
  }

  //lejar
  lejarExcel(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}` + "/lejerExcel/", data);
  }

  lejarPdf(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}` + "/lejerPdf/", data);
  }

  async getFileFromUrl(url, name, defaultType = "pdf") {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], name, {
      type: data.type || defaultType,
    });
  }
}
