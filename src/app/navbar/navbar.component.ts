import { Component, OnInit, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

   historyBanner : String;
   requestBanner:String
   issueRequestBanner:String
   returnRequestBanner:String

  constructor(private  router:Router,private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
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
