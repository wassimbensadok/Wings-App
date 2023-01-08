import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8888/ADDRESS-SERVICE/api/adr';
@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getAllGov(): Observable<any> {
    return this.http.get(baseUrl+'/GetAllGovernorate');
  }
  getGovByName(name: any): Observable<any> {
    return this.http.get(`${baseUrl+'/GetGovernorateIdByName'}/${name}`);
  }
  getAllCity(): Observable<any> {
    return this.http.get(baseUrl+'/GetAllCity');
  }
  getCityByGov(id: any): Observable<any> {
    return this.http.get(`${baseUrl+'/GetCityByGovernorate'}/${id}`);
  }

}
