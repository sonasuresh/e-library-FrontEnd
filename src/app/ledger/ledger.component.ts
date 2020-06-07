import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { BookService } from '../book.service';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {

  userId : String
  historyBooks:Array<any> = []

  constructor(private authenticationService:AuthenticationService,private bookService:BookService) { }

  ngOnInit(): void {
    if(this.getAdminLoggedIn()){
      this.getOverallHistory()
      //api hit to get all detatails in the request schema table
    }else{
      if(sessionStorage.getItem('user')!==null){
        this.userId = sessionStorage.getItem('user')
        this.getUserHistory()
         //api hit to get all detatails in the request schema table based on userId
      }else{
        console.log("No User Logged in")
      }
    }
  }
  getOverallHistory(){
    this.bookService.getOverallHistory().subscribe((res: any) => {
      if(res.success){
        this.historyBooks=res.message
        console.table(res)
        //window.location.reload()
      }else{
        alert('Error in Processing the request!')
      }
    })
  }
  getUserHistory(){
    this.bookService.getUserHistory().subscribe((res: any) => {
      if(res.success){
        this.historyBooks=res.message
        console.log(res)
        //window.location.reload()
      }else{
        alert('Error in Processing the request!')
      }
    })
  }
  getUserLoggedIn()
  {
    return this.authenticationService.isUserLoggedIn();
  }

  getAdminLoggedIn()
  {
    return this.authenticationService.isAdminLoggedIn();
  }

  removeRecord(requestId:any){
    this.bookService.clearParticularHistory(requestId).subscribe((res: any) => {
      if(res.success){
        alert("Deleted History")
        this.getUserHistory()
        window.location.reload()
      }else{
        alert('Error in Deleting the history!')
      }
    })
  }
  clearAllHistory(){
    this.bookService.clearHistory().subscribe((res: any) => {
      if(res.success){
        alert("Deleted History")
        this.getUserHistory()
        window.location.reload()
      }else{
        alert('Error in Deleting the history!')
      }
    })
  }

}
