import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormBuilder ,Validators} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  loginEmail : string
  loginPassword : string
  constructor(private  router:Router,private fb:FormBuilder,private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm  = this.fb.group({
      loginEmail:  ['',Validators.required],
      loginPassword:  ['',Validators.required],
    });
  }

  loginUser(){
  if(this.loginForm.valid){
    try {
      this.authService.login(this.loginForm.value).subscribe((res: any) => {
        console.log(res)
        const token = res.jwttoken;
        const username = res.username
        const userId = res.userId
        const role = res.role
        sessionStorage.setItem('token', JSON.stringify(token));
        if(res.role=='USER'){
          sessionStorage.setItem('user', JSON.stringify(userId));
         this.router.navigate(['books']);

        }else{
          sessionStorage.setItem('admin','admin');
           this.router.navigate(['users']);

        }
      })
    }
    catch (e) {
    }
  }else{
    alert("Fill out all fields")
  }
  }
}
