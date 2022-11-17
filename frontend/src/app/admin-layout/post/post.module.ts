import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostFormComponent } from './post-form/post-form.component';
import { PostListComponent } from './post-list/post-list.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {NotifierModule} from "angular-notifier";


@NgModule({
  declarations: [
    PostFormComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    EditorModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NotifierModule.withConfig({
      position: {horizontal: {position: 'middle',},
        vertical: {
          position: 'top',
          distance: 100,
          gap: 10
        }},
      behaviour: {autoHide: 5000
      }
    })
  ]
})
export class PostModule { }
