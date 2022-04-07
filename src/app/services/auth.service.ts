import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string="http://127.0.0.1:3000/";

  constructor(private http:HttpClient,private router:Router) { }
  Login(user:any){
    return this.http.post(this.url+'user/login',user)
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['signin']);
  }
  isLoggedIn(){
    if(localStorage.getItem('token')){
      return true;
    }
    return false;
  }
  currentUser(){
    const helper = new JwtHelperService();
    let token=localStorage.getItem('token');
    if(!token) return;
    return helper.decodeToken(token);
  }
  register(user:any){
    console.log("register")
    return this.http.post(this.url+'user',user)
  }
}
