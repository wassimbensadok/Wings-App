import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenStorageService } from './token.service';

const AUTH_API = 'api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient,private token : TokenStorageService) { }

  get isLoggedIn(): boolean {
    const user = this.token.getUser();
    return user !== null && user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_AGENT') ? true : false;
  }

  login(email: string, password: string): Observable<any> {
    this.loggedIn.next(true);
    return this.http.post(AUTH_API + 'USER-SERVICE/api/auth/signin', {
      email,
      password
    }, httpOptions);
  }

  register(firstname: string,lastname: string, email: string, governorate: String, address: String,  password: string, phone: String,role: string[]): Observable<any> {
    return this.http.post(AUTH_API + 'user-signup', {
      firstname,
      lastname,
      email,
      governorate,
      address,
      password,
      phone,
      role
    }, httpOptions);
  }



  delivery_register(firstname: string,lastname: string, email: string, governorate: String, address: String,  password: string, phone: String,cin: String,account_holder: String,bank_name: String,agency_name: String,agency_city: String,rib: String,role: string[]): Observable<any> {

    return this.http.post(AUTH_API+ 'delivery-signup', {
      firstname,
      lastname,
      email,
      governorate,
      address,
      password,
      phone,
      cin,
      account_holder,
      bank_name,
      agency_name,
      agency_city,
      rib,
      role
    }, httpOptions);
  }

  getId(email: any): Observable<any> {
    return this.http.get(`${AUTH_API}GetUserId/${email}`);
  }


  upload(id:any, file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('PUT', `http://localhost:8100/api/auth/UpdateImage/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
