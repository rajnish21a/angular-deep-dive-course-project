import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, AuthResponseData } from "./auth.service";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = false;
  showSpinner = false;
  error:string= null;
  authSub: Observable<AuthResponseData>;
  authForm: FormGroup  = new FormGroup({
    'email': new FormControl('', [Validators.email, Validators.required]),
    'password':new FormControl('', [Validators.required , Validators.minLength(6)])
  })
  constructor(private _authService: AuthService, private _router:Router) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(){
    if(this.authForm.invalid){
      return;
    };
    this.showSpinner = true;
    this.error=null;
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;
    console.log(this.authForm);
    if(this.isLoginMode){
      this.authSub =  this._authService.loginUser(email,password);
    }else{
      this.authSub = this._authService.signUpUser(email,password);
    }
    this.authSub.subscribe((responseData)=>{
      console.log(responseData);
      this._router.navigate(['recipes']);
      this.showSpinner = false;
    },
    error=>{
      console.log(error);
      this.showSpinner = false;
      this.error= error.message;
    }
    );
    this.authForm.reset();
  }

}
