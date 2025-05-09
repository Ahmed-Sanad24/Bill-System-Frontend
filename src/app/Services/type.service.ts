import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IType } from '../Models/iType';
import { environment } from '../../environments/environmnet';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private apiUrl = `${environment.apiUrl}/Type`;
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('usertoken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Correct header format
    });
  }
  constructor(private http: HttpClient) { }

  GetAllTypes(): Observable<IType[]> {
    return this.http.get<IType[]>(this.apiUrl);
  }
  AddType(type: IType): Observable<any> {
    return this.http.post(this.apiUrl, type, {headers:this.getHeaders()});
  }
  GetTypeById(typeId: any) {
    return this.http.get<IType>(`${this.apiUrl}/${typeId}`, {headers:this.getHeaders()});
  }
  GetTypeByCompanyName(companyName: any) {
    return this.http.get<IType[]>(`${this.apiUrl}/GetTypesByCompanyName?companyName=${companyName}`);
  }
  EditType(type: IType, typeId: any) {
    return this.http.put(`${this.apiUrl}/${typeId}`, type, {headers:this.getHeaders()});
  }
  DeleteType(typeId: any) {
    return this.http.delete(`${this.apiUrl}/${typeId}`, {headers:this.getHeaders()});
  }
}
