import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../services/post.service";
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {

  id: number;
  post: any;
  urlImages: string = environment.imgUrl + 'post/image/';
  defaultImage: string = environment.imgUrl + 'default/image/default-240x150.png';

  constructor(
    private activateRoute: ActivatedRoute,
    private postService: PostService
  ) {
    this.id = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    this.postService.getPost(this.id).subscribe((data)=> {
      this.post = data;
      console.log(this.post);
    });
  }

}
