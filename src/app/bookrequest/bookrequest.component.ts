import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { BookService } from '../book.service';


@Component({
  selector: 'app-bookrequest',
  templateUrl: './bookrequest.component.html',
  styleUrls: ['./bookrequest.component.css']
})
export class BookrequestComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService,private bookService:BookService) { }
  
  requestType : string
  userId : string
  requestedBooks: Array<any> = []
  allrequestedBooks:Array<any> = []

  ngOnInit(): void {
    if(sessionStorage.getItem("reqtype")!==null){
      this.requestType = sessionStorage.getItem("reqtype")
    }

    if(this.getAdminLoggedIn()){
      if(this.requestType==='Issue'){
         this.getRequests('issue')
       }
      else if(this.requestType==='Return'){
         this.getRequests('return')
        
      }
      //api hit for get all the books in the  request schema based on request type
    }else{
      if(JSON.parse(sessionStorage.getItem('user'))!==null){
        if(this.requestType==='Issue'){
          this.getRequestedBooks()
        }else if(this.requestType==='Return'){
          this.getReturnRequestedBooks()
        }else if(this.requestType==='Current'){
            this.getCurrentBooks()
        }
        //api hit for get all the books in the  request schema based on request type and userId from session storage
      }else{
        console.log("No User logged in")
      }
    }
  }
  
  getCurrentBooks(){
    this.bookService.getCurrentBooks().subscribe((res: any) => {
      this.requestedBooks = res.message
      console.log(res.message)
    })
  }

  getReturnRequestedBooks(){
    this.bookService.getReturnRequestedBooks().subscribe((res: any) => {
      console.log(res.message)
       this.requestedBooks = res.message
    })
 }
  getRequests(type:any){
    this.bookService.getRequests(type).subscribe((res: any) => {
       this.requestedBooks = res.message
    })
 }
  getRequestedBooks(){
    this.bookService.getRequestedBooks().subscribe((res: any) => {
      console.log(res.message)
      this.requestedBooks = res.message
    })
 }
 processRequest(requestId,status){
   console.log(requestId,status)
   const body = {
    requestId,
    status
   }
   if(this.requestType==='Issue'){
    this.bookService.processIssueRequest(body).subscribe((res: any) => {
      if(res.success){
        window.location.reload()
      }else{
        alert('Error in Processing the request!')
      }
    })
   }else if(this.requestType==='Return'){
    this.bookService.processReturnRequest(body).subscribe((res: any) => {
      if(res.success){
        window.location.reload()
      }else{
        alert('Error in Processing the request!')
      }
    })
   }
    
  }

  reject(){
    alert("Inside reject request")
  }

  sendReturnRequest(bookId,requestId){
    var date=new Date()
    if((date.getHours()>=10 && date.getHours()<17)){
    const body={
      requestId,
      bookId,
      userId:JSON.parse(sessionStorage.getItem(('user')))
    }
   
      this.bookService.sendReturnRequest(body).subscribe((res: any) => {
        if(res.success){
          alert("Return Request Send Successfully!")
          window.location.reload()
        }else{
          alert('Error in Processing the request!')
        }
      })
    }else{
      alert("Return Time Exceeded")
    }
   
  }

  getUserLoggedIn()
  {
    return this.authenticationService.isUserLoggedIn();
  }

  getAdminLoggedIn()
  {
    return this.authenticationService.isAdminLoggedIn();
  }

  displayReturn(){
    if(this.getUserLoggedIn() && this.requestType==="Current"){
      return true
    }else{
      return false
    }
  }

  displayReturnRequestDate(){
    if(this.requestType!=='Issue' && this.getAdminLoggedIn()){
      return true;
    }else{
      return false;
    }
  }

}
