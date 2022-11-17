import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from 'rxjs';
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.tokenService.loggedIn();
  }

  constructor(private tokenService: TokenService, private router: Router) {
  }


}
