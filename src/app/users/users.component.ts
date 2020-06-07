import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:Array<any>=[]
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getAllUserDetails()
  }

  toogleActiveStatus(userId,status){
    console.log(userId,status)
    this.userService.toggleUserStatus(userId,status).subscribe((res: any) => {
      if(res.success){
        this.users=res.message
        console.log(res.message)
        alert("Status Updated Successfully")

        window.location.reload()
      }else{
        alert('Error in updating the status of User!')
      }
    })
  }
  deleteUser(userId:any){
    this.userService.deleteUser(userId).subscribe((res: any) => {
      if(res.success){
        alert('User Deleted Successfully!')
        this.getAllUserDetails();
      }else{
        alert('Error in Deleting the User!')
      }
    })
  }
  getAllUserDetails(){
    this.userService.getAllUserDetails().subscribe((res: any) => {
      if(res.success){
        this.users=res.message
      
       
      }else{
        alert('Error in Processing the request!')
      }
    })
  }

}
