import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AfterLoginService} from "./services/after-login.service";
import {BeforeLoginService} from "./services/before-login.service";
import {BlogComponent} from "./public-layout/blog/blog.component";

const routes: Routes = [


  { path: '',
    loadChildren: () => import('./public-layout/public-layout.module').then(m => m.PublicLayoutModule),
  },

  { path: 'admin',
    loadChildren: () => import('./admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
    canActivate:[AfterLoginService],
    //pathMatch: 'full',
  },
  { path: 'admin/login',
    pathMatch: 'full',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate:[BeforeLoginService]
  },
  {path: '**', component: BlogComponent, redirectTo: '' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
