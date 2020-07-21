import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from "./user.model";
import { tap } from 'rxjs/Operators';
import { Router } from '@angular/router';


export interface AuthResponseData {
  idToken:	string,
  email:	string,
  refreshToken:	string,
  expiresIn: string,
  localId: string,
  registered?:string
}

@Injectable({providedIn:'root'})
export class AuthService{
  user=new Subject<User>();
  private expirationTime: any = null;

  constructor(private http:HttpClient,private router:Router){}

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.expirationTime){
      clearTimeout(this.expirationTime);
    }
    this.expirationTime = null;
  }

  signUpUser(email:string,password:string){

    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbl837dQQwE5SGT_Q0Sb8ICG0WtQp-IGs',{
      email:email,
      password:password,
      returnSecureToken:true
    })
    .pipe(tap(resData=>{
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn)
    }));
  }

  loginUser(email:string,password:string){

    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbl837dQQwE5SGT_Q0Sb8ICG0WtQp-IGs',{
      email:email,
      password:password,
      returnSecureToken:true
    })
    .pipe(tap(resData=>{
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);

    }));

  }

  handleAuthentication(email:string, userId:string, token:string , expiresIn:string){
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user= new User(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(+expiresIn *1000);
  }


  autoLogin(){
    const userData:{
      email:string,
      userId:string,
      token: string,
      expiresIn: number
    } = JSON.parse(localStorage.getItem("userData"));
    if(!userData){
      return;
    }

    const loadedUser = new User(userData.email, userData.userId, userData.token, new Date(userData.expiresIn));

    if(!loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData.expiresIn).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }


  }


  autoLogout(expirationTime: number){
    this.expirationTime = setTimeout(() => {
        this.logout();
    }, expirationTime);
  }


}
