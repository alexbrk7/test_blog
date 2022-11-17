import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestbookRoutingModule } from './guestbook-routing.module';
import {GuestbookComponent} from "./guestbook.component";

import {ReactiveFormsModule} from "@angular/forms";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NotifierModule } from 'angular-notifier';
import {PlatformModule} from "@angular/cdk/platform";

@NgModule({
  declarations: [GuestbookComponent],
  imports: [
    CommonModule,
    GuestbookRoutingModule,

    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxCaptchaModule,
    NotifierModule,
    PlatformModule
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
})
export class GuestbookModule { }
