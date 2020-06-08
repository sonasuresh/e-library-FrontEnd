import { Component, OnInit, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { BookService } from '../book.service';
import {PopoverModule} from "ngx-smart-popover";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  notifications:Array<any>=[]
   historyBanner : String;
   requestBanner:String
   issueRequestBanner:String
   returnRequestBanner:String

  constructor(private  router:Router,private authenticationService:AuthenticationService,private bookService:BookService) { }

  ngOnInit(): void {
    this.getNotifications()

    if(this.authenticationService.isAdminLoggedIn())
    {
      this.historyBanner="Books Issue History"
      this.requestBanner="Book Requests"
      this.issueRequestBanner="Book Issue Requests"
      this.returnRequestBanner="Book Return Requests"
    }
    else{
      this.historyBanner="My History"
      this.requestBanner="My Requests"
      this.issueRequestBanner="My Issue Requests"
      this.returnRequestBanner="My Return Requests"
    }
  }
  getNotifications(){
    this.bookService.getNotifications().subscribe((res: any) => {

      if(res.success){
        this.notifications=res.message
      }else{
        alert('Error in Fetching Notifications!')
      }
    })
  }
  setRequestType(reqtype){
    sessionStorage.setItem("reqtype",reqtype)
  }

  getUserLoggedIn()
  {
    return this.authenticationService.isUserLoggedIn();
  }

  getAdminLoggedIn()
  {
    return this.authenticationService.isAdminLoggedIn();
  }

  logout() {
    console.log("logging out")
    sessionStorage.clear()
    this.router.navigate(['']);
    alert("Successfully logged out..!!");
  }

}
