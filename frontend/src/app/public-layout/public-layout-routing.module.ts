import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PublicLayoutComponent} from "./public-layout.component";


const routes: Routes = [
  { path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
      { path: 'guest-book', loadChildren: () => import('./guestbook/guestbook.module').then(m => m.GuestbookModule) },
      { path: 'post', loadChildren: () => import('./post/post.module').then(m => m.PostModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicLayoutRoutingModule { }
