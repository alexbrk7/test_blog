import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handle(token: any) {
    this.set(token);
    //console.log(this.isValid());
  }

  set(token: any) {
    localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();
      if(token) {
        const payload = this.payload(token);
        const loginUrl = {
          login: environment.apiUrl + 'api/auth/login'
        }
        if(payload) {
          return Object.values(loginUrl).indexOf(payload.iss) > -1 ? true : false;
        }
      }
      return false;
  }

  payload(token: any) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload: any) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }
}
