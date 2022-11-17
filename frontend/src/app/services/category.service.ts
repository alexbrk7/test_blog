import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {ResponseHttp} from "../models/responseHttp";
import {Category} from "../models/category";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  getCategories() : Observable<Category[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/categories').pipe(
      map((data) => {
        return data.data.items;
    }),
      catchError((error)=> {
        throw(error)
      })
    )
  }

  getAdminCategories() : Observable<Category[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/auth/categories').pipe(
      map((data) => {
        return data.data.items;
      }),
      catchError((error)=> {
        throw(error)
      })
    )
  }

  storeAdminCategory(category: Category) : Observable<Category[]> {
    const headers = new HttpHeaders();
    //headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/auth/categories', toFormData(category), {headers: headers}).pipe(
      map((data) => {
        return data.data.item;
      }),
      catchError((error)=> {
        throw(error)
      })
    )
  }
  constructor(
    private http: HttpClient
  ) {

  }
}

export function toFormData<T>( formValue: any ) {
  const formData: any = new FormData();

  for ( const key of Object.keys(formValue) ) {
    const value = formValue[key];
    formData.append(key, value);
  }

  return formData;
}
