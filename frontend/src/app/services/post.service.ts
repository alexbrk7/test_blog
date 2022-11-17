import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {ResponseHttp} from "../models/responseHttp";
import {environment} from "../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Category} from "../models/category";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  getPosts() : Observable<Post[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/posts').pipe(
      map((data) => {
        return data.data.items;
      }),
      catchError((error)=> {
        throw(error)
      })
    )
  }

  getPost(id: number) {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/posts/' + id).pipe(
      map((data) => {
        return data.data.item;
      }),
      catchError((error)=> {
        if(error.status == '404') {
          this.router.navigateByUrl('/');
        }
        throw(error)
      })
    )
  }

  storeAdminPost(post: Post) : Observable<Post[]> {
    const headers = new HttpHeaders();
    //headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/auth/posts', toFormData(post), {headers: headers}).pipe(
      map((data) => {
        return data.data.item;
      }),
      catchError((error)=> {
        throw(error)
      })
    )
  }

  constructor(
    private http: HttpClient,
    private router: Router,
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
