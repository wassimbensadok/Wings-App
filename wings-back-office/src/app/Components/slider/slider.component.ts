import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth-service.service';
import { TokenStorageService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  currentUser:any;
  isLogin: any;
  constructor(private token : TokenStorageService, private authService : AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.isLogin = this.authService.isLoggedIn;
    this.loadJsFile("assets/libs/apexcharts/apexcharts.min.js");
    this.loadJsFile("assets/js/pages/dashboard.init.js");
    this.loadJsFile("assets/js/app.js");

  }

  public loadJsFile(url :string){
    let node = document.createElement('script');
    node.src=url;
    node.type='text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

}
