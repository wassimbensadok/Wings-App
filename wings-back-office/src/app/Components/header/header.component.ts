import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/Services/auth-service.service';
import { TokenStorageService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 isLogin:any;
 currentUser:any;
  constructor(private authService: AuthService ,private token : TokenStorageService, private router : Router) { }

  ngOnInit(): void {
    this.isLogin = this.authService.isLoggedIn;
    this.currentUser = this.token.getUser();
  }

  Logout(){
    this.token.signOut();
    this.router.navigateByUrl("/login")
  }
}
