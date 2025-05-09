import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environmnet';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient , private router:Router ) { }
  userData= new BehaviorSubject(null);
  private authStatusSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('usertoken'));

  basurl:string =`${environment.apiUrl}/Account/Login`;

  authChanged() {
    return this.authStatusSubject.asObservable();
  }

  isLogOut()
  {
    localStorage.removeItem("usertoken");
    this.userData.next(null);
    this.authStatusSubject.next(false);
    this.router.navigate(['/Login'])
  }

  decodeUserData()
  {
    let encodedToken= JSON.stringify( localStorage.getItem('usertoken'));
    let decodedToken:any = jwtDecode(encodedToken);
    console.log(decodedToken);
    this.userData.next(decodedToken);
    this.authStatusSubject.next(true);
    console.log(this.userData);
    const email = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    return email
  }

  Login(userdata:any):Observable<any>
  {
    return this.http.post(`${this.basurl}`, userdata)
  }
}
