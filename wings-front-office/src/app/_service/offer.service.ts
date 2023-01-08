
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getMatFormFieldDuplicatedHintError } from '@angular/material/form-field';
import { Observable } from 'rxjs';
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
export class OfferService {

  constructor(private http: HttpClient) { }

  getOfferByUser(id: any): Observable<any> {
    return this.http.get(`${baseUrl+'OFFER-SERVICE/api/GetOfferByUSerId'}/${id}`);
  }

  getOffer(): Observable<any> {
    return this.http.get(`${baseUrl+'OFFER-SERVICE/api/GetAllOffer'}`);
  }

  createoffer(data: { departGov: any; departAdr: any; arriGov: any; arriAdr: any; date_delivery: any; date_deadline: any; price: any; comment: any; userId: any; }): Observable<any> {
    return this.http.post(baseUrl+'OFFER-SERVICE/api/AddOffer',data,);
  }

  updateoffer(id: any, data: { departGov: any; departAdr: any; arriGov: any; arriAdr: any; date_delivery: any; date_deadline: any; price: any; comment: any; userId: any; }): Observable<any> {
    return this.http.put(`${baseUrl+'OFFER-SERVICE/api/UpdateOfferById'}/${id}`,data,);
  }
  
  sendInvitation(data: { userId: any; deliveryId: any; offerId: any; demandId: any; }): Observable<any> {
    return this.http.post(`${baseUrl+'OFFER-SERVICE/api/SendInvitation'}`,data,);
  }

  getInvitationByDelivery(id: any): Observable<any> {
    return this.http.get(`${baseUrl+'OFFER-SERVICE/api/getInvitationByDeliveryId'}/${id}`);
  }

  getInvitationByUser(id: any): Observable<any> {
    return this.http.get(`${baseUrl+'OFFER-SERVICE/api/getInvitationByUserId'}/${id}`);
  }

  acceptInvitation(id: any) : Observable<any>{
    return this.http.get(`${baseUrl+'OFFER-SERVICE/api/AcceptInvitation'}/${id}`);
  }

  refuseInvitation(id: any) : Observable<any>{
    return this.http.get(`${baseUrl+'OFFER-SERVICE/api/RefuseInvitation'}/${id}`);
  }

  cancelInvitation(id: any) : Observable<any>{
    return this.http.delete(`${baseUrl+'OFFER-SERVICE/api/CancelInvitation'}/${id}`);
  }

}



