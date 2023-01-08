import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore , 
  AngularFirestoreDocument,} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { User } from '../interface/user';
import { TokenStorageService } from './token-storage.service';
import { v4 as uuidv4} from 'uuid'
const AUTH_API = "api/";



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userData: any;
  Users :any;
  role: string[] = ['user']; 
  constructor(private http: HttpClient,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,private tokenStorage: TokenStorageService) { }

    get isLoggedIn(): boolean {
      const user = this.tokenStorage.getUser();
      return user !== null ? true : false;
    }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API +'USER-SERVICE/api/auth/signin', {
      email,
      password
    });
  }

  register(firstname: string,lastname: string, email: string, governorate: String, address: String,  password: string, phone: String,role: string[]): Observable<any> {
    return this.http.post(AUTH_API + 'USER-SERVICE/api/auth/user-signup', {
      firstname,
      lastname,
      email,
      governorate,
      address,
      password,
      phone,
      role
    });
  }

  UserPro_register(firstname: string,lastname: string,tax_num: number,establishment:string, email: string, governorate: String, address: String,  password: string, phone: String,role: string[]): Observable<any> {
    return this.http.post(AUTH_API + 'USER-SERVICE/api/auth/userPro-signup', {
      firstname,
      lastname,
      tax_num,
      establishment,
      email,
      governorate,
      address,
      password,
      phone,
      role
    });
  }


  delivery_register(firstname: string,lastname: string, email: string, governorate: String, address: String,  password: string, phone: String,cin: String,account_holder: String,bank_name: String,agency_name: String,agency_city: String,rib: String,role: string[],file: File,fileII: File): Observable<any> {
    const data = {firstname,lastname, email, governorate, address,  password, phone,cin,account_holder,bank_name,agency_name,agency_city,rib,role};
    const formData: FormData = new FormData();
    
    formData.append('file', file,uuidv4()+'.'+file.name.substring(file.name.lastIndexOf(".")+1));
    formData.append('fileII', fileII,uuidv4()+'.'+fileII.name.substring(fileII.name.lastIndexOf(".")+1));
    formData.append('user',JSON.stringify(data));
 
    return this.http.post(AUTH_API+ 'USER-SERVICE/api/auth/delivery-signup',formData);
  }


  

  AuthFacebookLogin(){
      this.afAuth.signInWithPopup(new auth.FacebookAuthProvider()).then((result) => {
        this.userData=result.additionalUserInfo?.profile;
        const Users = {firstname: this.userData.first_name,lastname: this.userData.last_name,email: result.user?.email,password: result.user?.uid };
        
      });
    return this.Users;
  }

  


  Sociallogin(firstname: string,lastname: string, email: string | any, role: string[]): Observable<any> {
    const password = "000000";
    return this.http.post(AUTH_API + 'USER-SERVICE/api/auth/SocilaSignin', {
      firstname,
      lastname,
      email,
      password,
      role
    });
  }

  Verficiation(email: string,code: string): Observable<any> {
    const params = new HttpParams()
   .set('email', email)
   .set('code', code);
    return this.http.get(AUTH_API + 'USER-SERVICE/api/auth/confirm',{params});
  }

}


 /*console.log(result);
          console.log(result.user?.phoneNumber);
          this.userData=result.additionalUserInfo?.profile;
          console.log(this.userData.family_name);
          console.log(this.userData.given_name);*/


          /*console.log(result);
          console.log(result.user?.phoneNumber);
          this.userData=result.additionalUserInfo?.profile;
          console.log(this.userData.first_name);
          console.log(this.userData.last_name);*/