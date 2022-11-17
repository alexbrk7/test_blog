import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicLayoutRoutingModule } from './public-layout-routing.module';
import { PublicLayoutComponent } from './public-layout.component';
import { HeaderComponent } from './layer/header/header.component';
import { FooterComponent } from './layer/footer/footer.component';
import { PostComponent } from './post/post.component';



@NgModule({
  declarations: [
    PublicLayoutComponent,
    HeaderComponent,
    FooterComponent,
    PostComponent,
  ],
  imports: [
    CommonModule,
    PublicLayoutRoutingModule,
  ]
})
export class PublicLayoutModule { }
