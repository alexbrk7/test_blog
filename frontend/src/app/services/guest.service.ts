import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Guestbook} from "../models/guestbook";
import {ResponseHttp} from "../models/responseHttp";
import {environment} from "../../environments/environment";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GuestService {


  constructor(private http: HttpClient) { }

  login(data: any)  {
    return this.http.post(environment.apiUrl + 'api/auth/login', data).pipe(
      map((data) => {
        return data;
      }),
      catchError((error)=> {
        console.log(error);
        throw(error)
      })
    )
  }


}
