import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInvoice } from '../Interfaces/iInvoice';
import { IDateRange } from '../Interfaces/idate-range';
import { environment } from '../../environments/environmnet';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private apiUrl = `${environment.apiUrl}/SalesInvoice`;
  private reportUrl = `${environment.apiUrl}/Reports`;
  
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('usertoken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Correct header format
    });
  }

  constructor(private http: HttpClient) { }
  
  GetAllInvoices(): Observable<IInvoice[]> {
    return this.http.get<IInvoice[]>(this.apiUrl);
  }
  AddInvoice(Invoice: IInvoice): Observable<any> {
    return this.http.post(this.apiUrl, Invoice, {headers: this.getHeaders()});
  }
  GetInvoiceById(InvoiceId: any) {
    return this.http.get<IInvoice>(`${this.apiUrl}/${InvoiceId}`, {headers: this.getHeaders()});
  }
  EditInvoice(Invoice: IInvoice, InvoiceId: any) {
    return this.http.put(`${this.apiUrl}/${InvoiceId}`, Invoice, {headers: this.getHeaders()});
  }
  DeleteInvoice(InvoiceId: any) {
    return this.http.delete(`${this.apiUrl}/${InvoiceId}`, {headers: this.getHeaders()});
  }
  InvoiceReport(dateRange: IDateRange): Observable<any> {
    return this.http.post(`${this.reportUrl}/invoice`, dateRange);
  }
  StorageReport(): Observable<any> {
    return this.http.get(`${this.reportUrl}/storage`);
  }
}
