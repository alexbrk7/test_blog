import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {Guestbook} from "../models/guestbook";
import {ResponseHttp} from "../models/responseHttp";
import {environment} from "../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GuestbookService {
  getGuestbooks() : Observable<Guestbook[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/guestbooks').pipe(
      map((data) => {
        return data.data.items;
      }),
      catchError((error)=> {
        throw(error)
      })
    )
  }

  storeGuest(guestbook: Guestbook) : Observable<Guestbook[]> {
    const headers = new HttpHeaders();
    //headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/guestbooks', toFormData(guestbook), {headers: headers}).pipe(
      map((data) => {
        return data.data.item;
      }),
      catchError((error)=> {
        throw(error)
      })
    )
  }

  getUserIp() {
    return this.http.get('https://jsonip.com/').pipe(
      map((data) => {
        return data;
      }),
      catchError((error)=> {
        throw(error)
      })
    )
  }


  constructor(
    private http: HttpClient
  ) { }


}

export function toFormData<T>( formValue: any ) {
  const formData: any = new FormData();

  for ( const key of Object.keys(formValue) ) {
    const value = formValue[key];
    formData.append(key, value);
  }

  return formData;
}
