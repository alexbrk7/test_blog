import { Component, OnInit } from '@angular/core';
import {CategoryService} from "src/app/services/category.service";
import {PostService} from "src/app/services/post.service";
import {Category} from "../../models/category";
import {Post} from "../../models/post";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass']
})


export class BlogComponent implements OnInit {

  categories: Category[];
  category: any;
  posts: Post[];
  urlThumbs: string = environment.imgUrl + 'post/image/';
  defaultImage: string = environment.imgUrl + 'default/image/default-240x150.png';
  filteredItems: any;
  selectedIndex: any = false;
  constructor(
    private categoryService: CategoryService,
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getPosts();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((data)=> {
      this.categories = Array.from(Object.values(data));
    });
  }

  getPosts() {
    this.postService.getPosts().subscribe((data)=> {
      this.posts = Array.from(Object.values(data));
      this.filteredItems = [...this.posts];
    });
  }

  filterItemsByCategory(category: Category) {
    this.filteredItems = this.posts.filter((post: Post) => {
      return post.category.id == category.id;
    });
  }

  resetFilter() {
    this.filteredItems = this.posts;
  }

  public listClick(index: any) {
    this.selectedIndex = index;
  }

}
