import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const baseUrl = 'api/';
@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(private http: HttpClient) { }

  createSpecificNotice(data: { text_notice: string; note: any; userId: any;}): Observable<any> {
    return this.http.post(baseUrl+'USER-SERVICE/api/auth/createSpecificNotice',data,);
  }

  createProductNotice(data: { text_notice: any; note: any; productId: any; }): Observable<any> {
    return this.http.post(baseUrl+'USER-SERVICE/api/auth/createProdcutNotice',data,);
  }
}
