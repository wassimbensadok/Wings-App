import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class ShopService {

  
  constructor(private http: HttpClient) { }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl+'SHOP-SERVICE/api/getCard'}/${id}`);
  }
  createCarde(card: { id: string; type: string; commercial_register: string; userProId: string; shopName: string; webSite: string; },file : File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file,uuidv4()+'.'+file.name.substring(file.name.lastIndexOf(".")+1));
    formData.append('card',JSON.stringify(card));
    return this.http.post(baseUrl+'SHOP-SERVICE/api/Card',formData);
  }

  getCardId(id: any): Observable<any> {
    return this.http.get(`${baseUrl+'SHOP-SERVICE/api/getCardByUserId'}/${id}`);
  }

  createProduct(product: { name: string; slug: string; sku: string; details: string; model: string; totalStock: string; weight: string; length: string; width: string; height: string; color: string; price: string; cardId: any; categoryId: string; subCategoryId: string; },fileI:File,fileII:File,fileIII:File,fileIIII:File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileI', fileI,uuidv4()+'.'+fileI.name.substring(fileI.name.lastIndexOf(".")+1));
    formData.append('fileII', fileII,uuidv4()+'.'+fileII.name.substring(fileII.name.lastIndexOf(".")+1));
    formData.append('fileIII', fileIII,uuidv4()+'.'+fileIII.name.substring(fileIII.name.lastIndexOf(".")+1));
    formData.append('fileIIII', fileIIII,uuidv4()+'.'+fileIIII.name.substring(fileIIII.name.lastIndexOf(".")+1));
    formData.append('product',JSON.stringify(product));
    return this.http.post(baseUrl+'SHOP-SERVICE/api/createProduct',formData);
  }
  
  getCategory(): Observable<any> {
    return this.http.get(`${baseUrl+'SHOP-SERVICE/api/getAllCategory'}`);
  }

  getSubCategoryByCategory(id:any): Observable<any> {
    return this.http.get(`${baseUrl+'SHOP-SERVICE/api/getSubCategoryByCategory'}/${id}`);
  }

  getProComBySubCatAndActivePro(SubCaName:any): Observable<any> {
    return this.http.get(`${baseUrl+'SHOP-SERVICE/api/getProComBySubCatAndActivePro'}/${SubCaName}`);
  }

  getProComByCatAndActivePro(Category:any): Observable<any> {
    return this.http.get(`${baseUrl+'SHOP-SERVICE/api/getProComByCatAndActivePro'}/${Category}`);
  }

  getProComByProName(name:any): Observable<any> {
    return this.http.get(`${baseUrl+'SHOP-SERVICE/api/getProComByProName'}/${name}`);
  }

  getProComByProId(id:any): Observable<any> {
    return this.http.get(`${baseUrl+'SHOP-SERVICE/api/getProComByProId'}/${id}`);
  }

  getProComByUserId(id:any): Observable<any> {
    return this.http.get(`${baseUrl+'SHOP-SERVICE/api/getAllProComByUserId'}/${id}`);
  }

  getProComByCard(id:any): Observable<any> {
    return this.http.get(`${baseUrl+'SHOP-SERVICE/api/getProComByCart'}/${id}`);
  }

  deleteProById(id:any): Observable<any> {
    return this.http.delete(`${baseUrl+'SHOP-SERVICE/api/DeletePro'}/${id}`);
  }

  updateProduct(id: any,product: { name: string; slug: string; sku: string; details: string; model: string; totalStock: string; weight: string; length: string; width: string; height: string; color: string; price: string; cardId: any; categoryId: string; subCategoryId: string; },fileI:File,fileII:File,fileIII:File,fileIIII:File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileI', fileI,uuidv4()+'.'+fileI.name.substring(fileI.name.lastIndexOf(".")+1));
    formData.append('fileII', fileII,uuidv4()+'.'+fileII.name.substring(fileII.name.lastIndexOf(".")+1));
    formData.append('fileIII', fileIII,uuidv4()+'.'+fileIII.name.substring(fileIII.name.lastIndexOf(".")+1));
    formData.append('fileIIII', fileIIII,uuidv4()+'.'+fileIIII.name.substring(fileIIII.name.lastIndexOf(".")+1));
    formData.append('product',JSON.stringify(product));
    return this.http.put(`${baseUrl+'SHOP-SERVICE/api/updateProduct'}/${id}`,formData);
  }

  searchPro(search:any): Observable<any> {
    return this.http.get(`${baseUrl+'SHOP-SERVICE/api/search'}/${search}`);
  }

  getRandomPro(): Observable<any> {
    return this.http.get(`${baseUrl+'SHOP-SERVICE/api/getRandomPro'}`);
  }

  command(data: { totalPrice: number; userId: any; }): Observable<any> {
    return this.http.post(`${baseUrl+'SHOP-SERVICE/api/addCommand'}`,data);
  }

  comItem(data: { quantity: any; price: any; productId: any; commandId: any; }): Observable<any> {
    return this.http.post(`${baseUrl+'SHOP-SERVICE/api/addComItem'}`,data);
  }

  getcomByUser(id:any): Observable<any> {
    return this.http.get(`${baseUrl+'SHOP-SERVICE/api/getCommandByUser'}/${id}`);
  }

  getComItem(id:any): Observable<any> {
    return this.http.get(`${baseUrl+'SHOP-SERVICE/api/getComItemByCom'}/${id}`);
  }
  
}
