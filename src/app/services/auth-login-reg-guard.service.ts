import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginRegGuardService {

  constructor(private router:Router,private auth:AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(!this.auth.isLoggedIn()) return true;
    this.router.navigate([''],{queryParams:{returnedurl:state.url}});
    return false;
  }
}
