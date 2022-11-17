import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GuestbookComponent} from "./guestbook.component";

const routes: Routes = [
  { path: '',
    component: GuestbookComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestbookRoutingModule { }
