import {Component, OnInit, Renderer2} from '@angular/core';
import {TokenService} from "../../../services/token.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  SidebarClass: string;

  constructor(
    private tokenService: TokenService,
    private Auth: AuthService,
    private router: Router,
    private renderer: Renderer2
    ) {
    const script1 = this.renderer.createElement('script');
    const script2 = this.renderer.createElement('script');
    script1.src = 'assets/scripts/demo.js';
    script1.type = 'text/javascript';
    script1.defer = true;
    script2.src = 'assets/scripts/main.js';
    script2.type = 'text/javascript';
    script2.defer = true;


    this.renderer.appendChild(document.head, script1);
    this.renderer.appendChild(document.head, script2);
  }

  ngOnInit() {

  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.tokenService.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('')
  }

}
