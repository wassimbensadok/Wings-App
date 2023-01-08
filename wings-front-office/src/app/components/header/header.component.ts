import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, isEmpty } from 'rxjs';
import { TokenStorageService } from 'src/app/_service/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  currentUser: any;
  myOrder: any;
  serachForm = new FormGroup({
    serach: new FormControl('', Validators.required)
  });
  constructor(private token: TokenStorageService,private tokenStorageService: TokenStorageService,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.currentUser = this.token.getUser();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
    }
    this.myOrder= JSON.parse(localStorage.getItem('cart')!);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.pathname = 'login';
  }

  Search(){
    console.log(this.serachForm.value);
    let v : string ="search/"+this.serachForm.value.serach;
    this.router.navigateByUrl(v);
  }
}
