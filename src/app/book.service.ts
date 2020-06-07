import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAllBooks(){
    return this.http.get(config.URL + `/book/`)
  }
  getBookDetails(bookId){
    return this.http.get(config.URL + `/book/${bookId}`)

  }

  getRequestedBooks(){
    return this.http.get(config.URL + `/book/user/requested/${JSON.parse(sessionStorage.getItem(('user')))}`)
  }

  getReturnRequestedBooks(){
    return this.http.get(config.URL + `/book/user/requested/return/${JSON.parse(sessionStorage.getItem(('user')))}`)
  }


  sendIssueRequest(data){
    return this.http.post(config.URL+`/book/request/issue`, data)
  }

  sendReturnRequest(data){
    return this.http.put(config.URL+`/book/request/return`, data)
  }
  getRequests(type){
    return this.http.get(config.URL+`/book/request/${type}`)
  }

  processIssueRequest(data){
    return this.http.put(config.URL+`/book/request/processissue`, data)
  }
  processReturnRequest(data){
    return this.http.put(config.URL+`/book/request/processreturn`, data)

  }
  getCurrentBooks(){
    return this.http.get(config.URL + `/book/user/current/${JSON.parse(sessionStorage.getItem(('user')))}`)

  }
  getUserHistory(){
    return this.http.get(config.URL + `/book/user/history/${JSON.parse(sessionStorage.getItem(('user')))}`)

  }
  getOverallHistory(){
    return this.http.get(config.URL + `/book/admin/history`)
  }
  clearParticularHistory(requestId){
    return this.http.delete(config.URL + `/book/request/${requestId}/${JSON.parse(sessionStorage.getItem(('user')))}`)

  }
  clearHistory(){
    return this.http.delete(config.URL + `/book/request/${JSON.parse(sessionStorage.getItem(('user')))}`)

  }
  addNewBook(Payload:any){
    return this.http.post(config.URL+`/book/`, Payload)
    
  }
}
