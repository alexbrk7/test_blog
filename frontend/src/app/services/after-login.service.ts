import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from 'rxjs';
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.tokenService.loggedIn()) {
      return this.tokenService.loggedIn();
    }
    if(!this.tokenService.loggedIn()) {
      this.router.navigateByUrl('/');
    }

    return false;
  }

  constructor(private tokenService: TokenService, private router: Router) {
  }


}
