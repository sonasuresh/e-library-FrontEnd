import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { BookService } from '../book.service';


@Component({
  selector: 'app-viewbook',
  templateUrl: './viewbook.component.html',
  styleUrls: ['./viewbook.component.css']
})
export class ViewbookComponent implements OnInit {
  typeValue: any = 'day';
  bookId: any
  issuablestatus:any
  constructor(private router: Router, private activatedRouter: ActivatedRoute, private authenticationService: AuthenticationService, private bookService: BookService) { }
  book: any
  authors:Array<any>=[]
  availablestatus:any
  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((params) => {
      if (params.bookId) {
        this.bookId = params.bookId
        this.getBookDetails()

      }
    })
  }
  isMembershipValid(){
    return !JSON.parse(sessionStorage.getItem('membershipFlag'))
  }
  getBookDetails() {
    this.bookService.getBookDetails(this.bookId).subscribe((res: any) => {
      this.book = res.message
      this.book.author.map((author,index)=>(
        this.authors[index] = (author.name)
      ))
      this.issuablestatus=this.book.issuableStatus
      this.availablestatus = this.book.availableStatus
    })
  }
  isTimeValid(){
    var date=new Date()
    if((date.getHours()>=10 && date.getHours()<17)){
      return false
    }else{
      return true
    }
  }
  checkIssueConstraint(){
    return JSON.parse(sessionStorage.getItem('membershipFlag')) && this.isTimeValid()
  }
  issueBook() {

      const data = {
        bookId: this.bookId,
        userId: JSON.parse(sessionStorage.getItem('user')),
        type: this.typeValue
      }
      try{
        this.bookService.sendIssueRequest(data).subscribe((res: any) => {
          alert('Issue Request Sent Successfully!')
  
       })
        
      }catch(error){
        alert('Error in sending issue request')
    }
    
   
  }
  setTypeValue(event) {
    this.typeValue = event.target.value
  }
  getUserLoggedIn() {
    return this.authenticationService.isUserLoggedIn();
  }

  getAdminLoggedIn() {
    return this.authenticationService.isAdminLoggedIn();
  }
  updateBook(_id) {
    const Payload={
      ...this.book
    }
    var auth={
      author:[]
    }
    for (var i in this.authors) {

      var item = this.authors[i];

      auth.author.push({
        "name": item
      });
    }
    Payload.author=auth.author
    Payload.id=_id
    Payload.availableStatus=this.availablestatus
    Payload.issuableStatus=this.issuablestatus
    this.bookService.updateBookDetails(Payload).subscribe((res: any) => {
      if(res.success){
        alert('Book Details Updated Successfully!')
        window.location.reload()
      }else{
        alert('Error in Updating Book Details!')
      }
    })
  }
  setChecked(value){
   this.issuablestatus=value
   console.log(this.issuablestatus)
  }

  setAvailableChecked(value){
    this.availablestatus=value
    console.log(this.availablestatus)
  }
}
