"use strict";(self.webpackChunkangularblog=self.webpackChunkangularblog||[]).push([[509],{4509:(f,i,n)=>{n.r(i),n.d(i,{PostModule:()=>h});var r=n(6895),a=n(3572),u=n(2340),t=n(4650),d=n(9166);let p=(()=>{class o{constructor(s,e){this.activateRoute=s,this.postService=e,this.urlImages=u.N.imgUrl+"post/image/",this.defaultImage=u.N.imgUrl+"default/image/default-240x150.png",this.id=this.activateRoute.snapshot.params.id}ngOnInit(){this.getPost()}getPost(){this.postService.getPost(this.id).subscribe(s=>{this.post=s,console.log(this.post)})}}return o.\u0275fac=function(s){return new(s||o)(t.Y36(a.gz),t.Y36(d.L))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-post"]],decls:24,vars:5,consts:[[1,"row"],[1,"col-lg-8"],[1,"mb-4"],[1,"fw-bolder","mb-1"],[1,"text-muted","fst-italic","mb-2"],["aria-label","breadcrumb"],[1,"breadcrumb"],[1,"breadcrumb-item","text-primary"],["routerLink","/"],["aria-current","page",1,"breadcrumb-item","active"],["alt","...",1,"img-fluid","rounded",3,"src"],[1,"mb-5",3,"innerHTML"],[1,"col-lg-4"],[1,"card","mb-4"],[1,"card-header"],[1,"card-body"]],template:function(s,e){1&s&&(t.TgZ(0,"div",0)(1,"div",1)(2,"article")(3,"header",2)(4,"h1",3),t._uU(5),t.qZA(),t.TgZ(6,"div",4),t._uU(7),t.qZA(),t.TgZ(8,"nav",5)(9,"ol",6)(10,"li",7)(11,"a",8),t._uU(12,"Home"),t.qZA()(),t.TgZ(13,"li",9),t._uU(14),t.qZA()()()(),t.TgZ(15,"figure",2),t._UZ(16,"img",10),t.qZA(),t._UZ(17,"section",11),t.qZA()(),t.TgZ(18,"div",12)(19,"div",13)(20,"div",14),t._uU(21,"Side Widget"),t.qZA(),t.TgZ(22,"div",15),t._uU(23,"You can put anything you want inside of these side widgets. They are easy to use, and feature the Bootstrap 5 card component!"),t.qZA()()()()),2&s&&(t.xp6(5),t.Oqu(null==e.post?null:e.post.title),t.xp6(2),t.hij("Posted: ",null==e.post?null:e.post.created_at,""),t.xp6(7),t.Oqu(null==e.post?null:e.post.slug),t.xp6(2),t.Q6J("src",null!=e.post&&e.post.image?e.urlImages+(null==e.post?null:e.post.image):e.defaultImage,t.LSH),t.xp6(1),t.Q6J("innerHTML",null==e.post?null:e.post.content,t.oJD))},dependencies:[a.yS]}),o})();const g=[{path:"",component:n(5671).O,pathMatch:"prefix"},{path:":id",component:p}];let c=(()=>{class o{}return o.\u0275fac=function(s){return new(s||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[a.Bz.forChild(g),a.Bz]}),o})(),h=(()=>{class o{}return o.\u0275fac=function(s){return new(s||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[r.ez,c]}),o})()}}]);