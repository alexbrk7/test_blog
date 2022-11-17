import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {throwError} from "rxjs";
import {GuestService} from "../services/guest.service";
import {TokenService} from "../services/token.service";
import {AuthService} from "../services/auth.service";
import {User} from "../models/user";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  error: any;
  form: FormGroup;
  user: User

  constructor(
    private guestService: GuestService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private router: Router,
    private Auth: AuthService
  ) {
    this.user = {
      email: '',
      password: ''
    }
  }

  get f() {return this.form.controls}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl(this.user.email,[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.user.password,[
        Validators.required,
        Validators.min(1)
      ]),
    })
  }

  onSubmit() {
    if(this.form.invalid) {
      return;
    }

    Object.assign(this.user, this.form.value);
    //console.log(this.user);
    this.guestService.login(this.user).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data: any) {
    this.tokenService.handle(data.access_token)
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/admin/dashboard');
  }

  handleError(error: any) {
    this.error = error.error.error
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.tokenService.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('admin/login')
  }

}
