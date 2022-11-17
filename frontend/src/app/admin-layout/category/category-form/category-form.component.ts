import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../models/category";
import {NotifierService} from "angular-notifier";
import {CategoryService} from "../../../services/category.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.sass']
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  category: Category;
  private readonly notifier: NotifierService;
  constructor(
    notifierService: NotifierService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
  ) {
    this.notifier = notifierService;
    this.category = {
      id: 0,
      title: '',
      slug: '',
      content: '',
      status: 0,
      image: '',
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: new FormControl(this.category.title,[
        Validators.required,
        Validators.min(1)
      ]),
      slug: new FormControl(this.category.slug,[
        Validators.required,
        Validators.min(1)
      ]),

      content: new FormControl(this.category.content),

    })
  }

  get f() {return this.form.controls}

  onSubmit() {
    if(this.form.invalid) {
      return;
    }


    Object.assign(this.category, this.form.value);

    this.storeAdminCategory();
  }

  storeAdminCategory() {
    this.categoryService.storeAdminCategory(this.category).subscribe((data)=>{
      if(data) {
        this.notifier.notify('success', 'Category has been successfully added!');
        this.form.reset();

      }
    })
  }


}
