import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {Guestbook} from "../../models/guestbook";
import { ReCaptcha2Component } from 'ngx-captcha';
import {GuestbookService} from "src/app/services/guestbook.service";
import {Router} from "@angular/router";
import { NotifierService } from 'angular-notifier';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {environment} from "../../../environments/environment";
import {Platform} from "@angular/cdk/platform";


@Component({
  selector: 'app-guestbook',
  templateUrl: './guestbook.component.html',
  styleUrls: ['./guestbook.component.sass']
})


export class GuestbookComponent implements OnInit {

  displayedColumns: string[] = ['id', 'image', 'name', 'email', 'link', 'comment', 'user_ip', 'user_agent', 'created_at'];
  dataSource: MatTableDataSource<any>; // mat table data source


  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  @ViewChild('langInput') langInput: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort
  @ViewChild('inputFile') myInputVariable: ElementRef;

  defaultImage: string = environment.imgUrl + 'default/image/default-240x150.png';
  form: FormGroup;
  guestbook: Guestbook;
  guestbooks: Guestbook[];
  ipAddress: string ='';
  userBrowser: string  = '';
  imageSrc: string = '';
  uploadImage: any = '';
  urlThumbs: string = environment.imgUrl + 'guestbook/thumb/';

  private readonly notifier: NotifierService;

  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;
  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'en';
  public type: 'image' | 'audio';




  constructor(
    notifierService: NotifierService,
    private formBuilder: FormBuilder,
    private guestbookService: GuestbookService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    public platform: Platform
  ) {
    this.notifier = notifierService;
    this.guestbook = {
      id: 0,
      name: '',
      email: '',
      link: '',
      comment: '',
      user_ip: '',
      user_agent: '',
      status: 0,
      image: [null],
    }


  }

  ngOnInit(): void {
    this.getUserIp();
    this.getUserBrowser();
    this.getGuestbooks();
    this.form = this.formBuilder.group({
      name: new FormControl(this.guestbook.name,[
        Validators.required,
        Validators.min(1)
      ]),
      email: new FormControl(this.guestbook.name,[
        Validators.required,
        Validators.email
      ]),
      link: new FormControl(this.guestbook.link),
      user_ip: this.guestbook.user_ip,
      user_agent: this.guestbook.user_agent,
      comment: new FormControl(this.guestbook.comment,[
        Validators.required
      ]),
      image: this.uploadImage,
      recaptcha: ['', Validators.required]
    })
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  get f() {return this.form.controls}

  onSubmit() {
    if(this.form.invalid) {
      return;
    }


    this.form.value.user_ip = this.ipAddress;
    this.form.value.user_agent = this.userBrowser;
    Object.assign(this.guestbook, this.form.value);

    this.storeGuest();
  }

  getGuestbooks() {
    this.guestbookService.getGuestbooks().subscribe((data)=> {
      this.guestbooks = data
      // console.log(data);
      this.dataSource = new MatTableDataSource(this.guestbooks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  storeGuest() {
    this.guestbookService.storeGuest(this.guestbook).subscribe((data)=>{
      if(data) {
        this.notifier.notify('success', 'Thank you! Your comment has been successfully added!');
        this.form.reset();
        this.imageSrc = '';
        this.getGuestbooks();
      }
    })
  }

  getUserIp() {
    this.guestbookService.getUserIp().subscribe((data:any)=>{
      if(data) {
        this.ipAddress = data.ip;
      }
    })
  }

  getUserBrowser() {
    if (this.platform.ANDROID) {
      this.userBrowser = 'Android';
    }else if (this.platform.BLINK) {
      this.userBrowser = 'Chrome';
    }else if (this.platform.EDGE) {
      this.userBrowser = 'EDGE';
    } else if (this.platform.FIREFOX) {
      this.userBrowser = 'FIREFOX';
    }else if (this.platform.IOS) {
      this.userBrowser = 'IOS';
    }else if (this.platform.SAFARI) {
      this.userBrowser = 'SAFARI';
    } else if (this.platform.TRIDENT) {
      this.userBrowser = 'Microsoft Trident';
    } else if (this.platform.WEBKIT) {
      this.userBrowser = 'WEBKIT';
    } else {
      this.userBrowser = 'Unknown browser';
    }
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
        //console.log(reader.result);
        this.imageSrc = reader.result as string;
      };

    }
  }


  onFileClear() {
    this.myInputVariable.nativeElement.value = '';
    this.imageSrc = '';
  }

  handleSuccess(data: any) {
    // console.log(data);
  }

}

