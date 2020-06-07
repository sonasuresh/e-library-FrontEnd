import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }


  public setUserLoggedIn(name:string)
  {
    sessionStorage.setItem("user",name)
  }

  public setAdminLoggedIn()
  {
    sessionStorage.setItem("admin","admin")
  }

  isUserLoggedIn() {
    return !(sessionStorage.getItem('user') === null)
  }

  isAdminLoggedIn() {
    return !(sessionStorage.getItem('admin') === null)
  }

  login(userDetails: any) {
    const data = {
      email: userDetails.loginEmail,
      password: userDetails.loginPassword
    }
    return this.http.post(config.URL + `/user/login`, data)
  }
}
