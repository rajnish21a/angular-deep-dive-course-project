import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpEvent } from "@angular/common/http";
import { AuthService } from './auth.service';
import { take, exhaustMap } from "rxjs/Operators";
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private _authService:AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return this._authService.user.pipe(
      take(1),
      exhaustMap(userData=>{
        console.log("fffffffffffffffffffffffffffff");
        debugger;
        if(!userData){
          return next.handle(req);
        }
        const modifiedReq = req.clone({params: new HttpParams().set('auth',userData.token)});
        return next.handle(modifiedReq);
      })
    );
  }
}
