import { Iitems } from './../Interfaces/Iitems';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFormdata } from '../Interfaces/Iformdata';
import { environment } from '../../environments/environmnet';

@Injectable({
  providedIn: 'root'
})
export class ItemsServiceService {
  private apiUrl = `${environment.apiUrl}/Items`;

  constructor(public httpclint:HttpClient) { }

  private getHeaders(): HttpHeaders {
     const token = localStorage.getItem('usertoken');
     return new HttpHeaders({
       'Authorization': `Bearer ${token}`  // Correct header format
     });
   }
   
 getAllItems():Observable<Iitems[]>
 {
      return this.httpclint.get<Iitems[]>(`${this.apiUrl}/AllItems`)
 }

 getFormData():Observable<IFormdata>
 {
      return this.httpclint.get<IFormdata>(`${this.apiUrl}/FormData`)
 }

 AddItem(items:Iitems[]):Observable<Iitems[]>
 {
      return this.httpclint.post<Iitems[]>(`${this.apiUrl}`, items, {headers:this.getHeaders()})
 }

 getById(id:number):Observable<any>
 {
     return this.httpclint.get<Iitems>(`${this.apiUrl}/GetById/${id}`, {headers:this.getHeaders()})
 }
 
 getAmountById(id:number):Observable<any>
 {
     return this.httpclint.get<number>(`${this.apiUrl}/GetAmountById/${id}`)
 }

editItem(item:Iitems)
{
     return this.httpclint.put<Iitems>(`${this.apiUrl}`, item, {headers:this.getHeaders()})
}

editAmountByItemId(id:number, amount:number)
{
     return this.httpclint.put(`${this.apiUrl}/${id}/${amount}`, null)
}

deleteItem(id:number)
{
     return this.httpclint.delete(`${this.apiUrl}/${id}`, {headers:this.getHeaders()})
}
}
