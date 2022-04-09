import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InterceptorsService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token=localStorage.getItem('token');
    console.log(token);
    
    let newheader=new HttpHeaders();
    newheader= newheader.append('Authentication', !!token ? 'Bearer ' + token : '');
    const newRequest =   req.clone({
        headers: newheader
      });
    console.log(newRequest);

  return  next.handle(newRequest)
}
}
