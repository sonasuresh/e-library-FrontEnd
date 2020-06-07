import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormBuilder ,Validators} from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  signupForm: FormGroup;

  
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+[.]{1}[a-z]{3}";

  passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,12}$"

  constructor(private fb:FormBuilder,private userService:UserService) { }

  ngOnInit(): void {
    this.signupForm  = this.fb.group({
      name:  ['',Validators.required],
      dob:  ['',Validators.required],
      email : ['',[Validators.required,Validators.pattern(this.emailPattern)]],
      city:  ['',Validators.required],
      mobile : ['',[Validators.required,Validators.minLength(10), Validators.maxLength(10)]],
      membershipStart:  ['',Validators.required],
      membershipEnd:  ['',Validators.required],
      readingHours : ['',[Validators.required]],
    });
  }

  createUser(){
    if(this.signupForm.valid){
      this.userService.addNewUser(this.signupForm.value).subscribe((res: any) => {
        if(res.success){
          alert('New User Added Successfully!')
          window.location.reload()
        }else{
          alert('Error in adding New User!')
        }
      })
    }else{
      alert("Fill all fields")
    }
  }
}
