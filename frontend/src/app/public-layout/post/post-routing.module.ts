import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostComponent} from "./post.component";
import {BlogComponent} from "../blog/blog.component";


const routes: Routes = [
  {path: '', component: BlogComponent, pathMatch: 'prefix'},
  { path: ':id',
    component:PostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
