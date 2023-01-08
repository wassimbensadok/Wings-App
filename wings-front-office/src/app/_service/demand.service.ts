import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getMatFormFieldDuplicatedHintError } from '@angular/material/form-field';
import { map, Observable } from 'rxjs';
import { v4 as uuidv4} from 'uuid'
const optionRequete = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'mon-entete-personnalise':'maValeur'
  })
};
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })}

const baseUrl = 'api/';
@Injectable({
  providedIn: 'root'
})
export class DemandService {

  constructor(private http: HttpClient) { }
  

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl+'OFFER-SERVICE/api/GetDemandByUserId'}/${id}`);
  }

  getDemandById(id: any): Observable<any> {
    return this.http.get(`${baseUrl+'OFFER-SERVICE/api/GetDemandById'}/${id}`);
  }
  
  create(data: { departGov: string; departAdr: string; arriGov: string; arriAdr: string; type: string; tel_receiver: string; remark: string; date_delivery: string; weight: any; height: any; length: any; userId: any; },file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file,uuidv4()+'.'+file.name.substring(file.name.lastIndexOf(".")+1));
    formData.append('demand',JSON.stringify(data));
    return this.http.post(baseUrl+'OFFER-SERVICE/api/AddDemand',formData);
  }

  update(data: { departGov: string; departAdr: string; arriGov: string; arriAdr: string; type: string; tel_receiver: string; remark: string; date_delivery: string; weight: any; height: any; length: any; userId: any; },file: File,id:any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('demand',JSON.stringify(data));
    return this.http.put(`${baseUrl+'OFFER-SERVICE/api/UpdateDemandById'}/${id}`,formData);
  }

  createII(data: { departGov: string; departAdr: string; arriGov: string; arriAdr: string; type: string; tel_receiver: string; remark: string; date_delivery: string; userId: any; }): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('demand',JSON.stringify(data));
    return this.http.post(baseUrl+'OFFER-SERVICE/api/AddDemand2',data,httpOptions);
  }
  
  getImage(url:string, filename: string) {
    return this.http
      .get(url, {
        responseType: "arraybuffer"
      })
      .pipe(
        map((response: BlobPart) => {
          return new File([response], filename);
        })
      );
  }
  
}



