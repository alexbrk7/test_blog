import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {ReactiveFormsModule} from "@angular/forms";
import { NotifierModule } from 'angular-notifier';

@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    EditorModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NotifierModule.withConfig({
      position: {horizontal: {position: 'middle',},  vertical: {
          position: 'top',
          distance: 100,
          gap: 10
        }},
      behaviour: {autoHide: 5000
      }
    })
  ]
})
export class CategoryModule { }
