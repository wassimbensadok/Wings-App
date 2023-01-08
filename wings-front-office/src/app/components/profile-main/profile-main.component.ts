import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.css']
})
export class ProfileMainComponent implements OnInit {
  currentUser: any;

  User:any;
  constructor(private token: TokenStorageService, private tokenStorageService: TokenStorageService, private userService : UserService, private router : Router, private authService : AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.loadJsFile("assets/js/dropdown.js"); 
    this.loadJsFile("assets/js/uploadimg.js"); 
    this.getUser();
    console.log(/************ */);
  console.log(this.authService.isLoggedIn);
  }
  public loadJsFile(url: string) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }  

  getUser(): void {
    this.userService.getUserById(this.currentUser.id)
      .subscribe(
        data => {
          this.User=data;
        },
        error => {
        });
  }
  
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.pathname = 'login';
  }
}
