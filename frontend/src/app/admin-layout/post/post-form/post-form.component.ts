import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../../models/post";
import {NotifierService} from "angular-notifier";
import {PostService} from "../../../services/post.service";
import {Category} from "../../../models/category";
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.sass']
})
export class PostFormComponent implements OnInit {

  @ViewChild('inputFile') myInputVariable: ElementRef;

  form: FormGroup;
  post: Post;
  categories: Category[];
  imageSrc: string = '';
  uploadImage: any = '';

  private readonly notifier: NotifierService;

  constructor(
    notifierService: NotifierService,
    private formBuilder: FormBuilder,
    private postService: PostService,
    private categoryService: CategoryService
  ) {
    this.notifier = notifierService;
    this.post = {
      id: 0,
      title: '',
      slug: '',
      content: '',
      status: 0,
      image: '',
      category_id: 0,
      category: '',
      created_at: '',
    }

  }

  ngOnInit(): void {
    this.getAdminCategories();
    this.form = this.formBuilder.group({
      title: new FormControl(this.post.title,[
        Validators.required,
        Validators.min(3)
      ]),
      slug: new FormControl(this.post.slug,[
        Validators.required,
        Validators.min(3)
      ]),
      category_id: new FormControl(this.post.category_id),
      content: new FormControl(this.post.content),
      image: this.uploadImage
    })
  }

  get f() {return this.form.controls}

  onSubmit() {
    if(this.form.invalid) {
      return;
    }


    Object.assign(this.post, this.form.value);

    this.storeAdminPost();
  }

  storeAdminPost() {
    this.postService.storeAdminPost(this.post).subscribe((data)=>{
      if(data) {
        this.notifier.notify('success', 'Post has been successfully added!');
        this.form.reset();
        this.imageSrc = '';
      }
    })
  }

  getAdminCategories() {
    this.categoryService.getAdminCategories().subscribe((data)=> {
      this.categories = Array.from(Object.values(data));
      //console.log(this.categories);
    })
  }

  onFileChange(event:any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      let select = event.target.files[0];
      //console.log(select.type);
      if(select.type !== "image/png" &&
        select.type !== "image/jpg" &&
        select.type !== "image/jpeg"){
        event.target.value = null;
        this.notifier.notify('error', 'File type must be png, jpg, jpeg!');
      }

      this.uploadImage = (event.target as HTMLInputElement)?.files?.[0];
      this.form.patchValue({
        image: this.uploadImage
      });

      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {

        this.imageSrc = reader.result as string;
      };

    }
  }


  onFileClear() {
    this.myInputVariable.nativeElement.value = '';
    this.imageSrc = '';
  }

}
