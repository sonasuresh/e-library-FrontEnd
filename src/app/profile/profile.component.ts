import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile:any
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getUserDetails()
  }

  getUserDetails(){
    this.userService.getUserDetails().subscribe((res: any) => {
      this.profile=res.message
    })
  }
}
