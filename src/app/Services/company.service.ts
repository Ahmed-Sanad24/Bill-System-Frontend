import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICompany } from '../Models/icompany';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environmnet';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
    private apiUrl = `${environment.apiUrl}/Company`;

    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('usertoken');
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`  // Correct header format
      });
    }
  constructor(private http : HttpClient)
  {}

  GetAllCompanies():Observable<ICompany[]>{
    return this.http.get<ICompany[]>(this.apiUrl);
  }
  GetCompanyById(companyId:any):Observable<ICompany>{
    return this.http.get<ICompany>(`${this.apiUrl}/${companyId}`,{headers:this.getHeaders()});
  }
  AddCompany(company:ICompany){
    return this.http.post(this.apiUrl,company,{headers:this.getHeaders()});
  }
  EditCompany(company: ICompany , companyId:any){
    return this.http.put(`${this.apiUrl}/${companyId}`,company,{headers:this.getHeaders()})
  }
  DeleteCompany(companyId:any){
    return this.http.delete(`${this.apiUrl}/${companyId}`,{headers:this.getHeaders()});
  }
}
