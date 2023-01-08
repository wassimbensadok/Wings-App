import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const baseUrl = 'api/';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getuser(): Observable<any> {
    return this.http.get(`${baseUrl+'USER-SERVICE/api/auth/GetUser'}`);
  }

  getDelivery(): Observable<any> {
    return this.http.get(`${baseUrl+'USER-SERVICE/api/auth/GetDelivery'}`);
  }

  getadmin(id: any): Observable<any> {
    return this.http.get(`${baseUrl+'/Get ByAdminId'}/${id}`);
  }

  getvendeur(): Observable<any> {
    return this.http.get(`${baseUrl+'USER-SERVICE/api/auth/GetUserPro'}`);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl+'USER-SERVICE/api/auth/GetUserById/'}/${id}`);
  }

  getAdminAndAgent(): Observable<any> {
    return this.http.get(`${baseUrl+'USER-SERVICE/api/auth/GetAdmin'}`);
  }
  
  create(data: { lastname: string; firstname: string; email: string; phone: string; role: string[] | undefined; password: string; }): Observable<any> {
    return this.http.post(baseUrl+'USER-SERVICE/api/auth/admin-signup', data);
  }
  createFacteur(data: { nomliv: string;nomcl1: string;nomcl2: string;type: string;montant: string;date:String; }): Observable<any> {
    return this.http.post(baseUrl+'/Add-Demand', data);
  }
  update(data: { nom: string;prenom: string;telephone: string;email: string;type: string; }): Observable<any> {
    return this.http.patch(baseUrl+'/Add-Demand', data);
  }

  enabledUser(id: any): Observable<any> {
    return this.http.get(`${baseUrl+'USER-SERVICE/api/auth/enableUserById/'}/${id}`);
  }

  disabledUser(id: any): Observable<any> {
    return this.http.get(`${baseUrl+'USER-SERVICE/api/auth/disableUserById/'}/${id}`);
  }

  getAllPro(): Observable<any> {
    return this.http.get(`${baseUrl+'SHOP-SERVICE/api/getAllProComWithVendor'}`);
  }

  EnabelPro(id: any): Observable<any> {
    return this.http.get(`${baseUrl+'SHOP-SERVICE/api/EnabelPro'}/${id}`);
  }

  DesabelPro(id: any): Observable<any> {
    return this.http.get(`${baseUrl+'SHOP-SERVICE/api/DesabelPro'}/${id}`);
  }

  getCategory(): Observable<any> {
    return this.http.get(`${baseUrl+'SHOP-SERVICE/api/getAllCategory'}`);
  }

  createCategory(name: string): Observable<any> {
    let params = new HttpParams().set("name", name);
    return this.http.post(`${baseUrl+'SHOP-SERVICE/api/createCategory'}`, params);
  }
  createSubCategory(name: string ,id: any): Observable<any> {
    let params = new HttpParams().set("name", name);
    
    return this.http.post(`${baseUrl+'SHOP-SERVICE/api/createSubCategory'}/${id}`, params);
  }

  getCommand(): Observable<any> {
    return this.http.get(`${baseUrl+'SHOP-SERVICE/api/getCommand'}`);
  }

  getComItem(id:any): Observable<any> {
    return this.http.get(`${baseUrl+'SHOP-SERVICE/api/getComItemByCom'}/${id}`);
  }
}
