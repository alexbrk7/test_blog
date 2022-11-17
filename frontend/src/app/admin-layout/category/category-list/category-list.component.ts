import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from "src/app/services/category.service";
import {Category} from "../../../models/category";
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from "@angular/router";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.sass']
})

export class CategoryListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'slug', 'created_at'];
  dataSource: MatTableDataSource<any>; // mat table data source

  @ViewChild(MatPaginator) paginator: MatPaginator;

  categories: Category[];

  constructor(

    private categoryService: CategoryService,
    private router: Router,


  ) {}

  ngOnInit(): void {
    this.getAdminCategories();
  }

  getAdminCategories() {
    this.categoryService.getAdminCategories().subscribe((data)=> {
      this.categories = Array.from(Object.values(data));
      this.dataSource = new MatTableDataSource(this.categories);
      this.dataSource.paginator = this.paginator;
    })
  }

}
