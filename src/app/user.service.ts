import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserDetails(){
    return this.http.get(config.URL + `/user/${JSON.parse(sessionStorage.getItem(('user')))}`)

  }

  getAllUserDetails(){
    return this.http.get(config.URL + `/user/`)

  }
  addNewUser(data){
    return this.http.post(config.URL + `/user/`,data)

  }
  toggleUserStatus(userId,status){
    return this.http.put(config.URL + `/user/${userId}/${status}`,null)
    
  }
  deleteUser(userId){
    return this.http.delete(config.URL + `/user/${userId}`)

  }
}
