import {Component, OnInit, ViewChild} from '@angular/core';
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";
import {MatTableDataSource} from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass']
})
export class PostListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'image', 'title', 'slug', 'created_at'];
  dataSource: MatTableDataSource<any>; // mat table data source

  @ViewChild(MatPaginator) paginator: MatPaginator;

  urlThumbs: string = environment.imgUrl + 'post/thumb/';
  defaultImage: string = environment.imgUrl + 'default/image/default-240x150.png';
  posts: Post[];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe((data)=> {
      this.posts = Array.from(Object.values(data));
      this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.paginator = this.paginator;
    })
  }

}
