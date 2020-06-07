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

  issueBook() {
    const data = {
      bookId: this.bookId,
      userId: JSON.parse(sessionStorage.getItem('user')),
      type: this.typeValue
    }
    this.bookService.sendIssueRequest(data).subscribe((res: any) => {
      console.log(res)
    })
    alert("Inside IssueBook")
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
    // const Payload
    console.log(this.book,this.authors,this.issuablestatus)
    console.log(_id)
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
