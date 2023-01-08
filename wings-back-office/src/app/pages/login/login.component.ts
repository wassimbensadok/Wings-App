import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth-service.service';
import { TokenStorageService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: '',
    password: ''
  };
  userData: any;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  routers:string = '';
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {
  
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    const { email, password } = this.form;
    this.authService.login(email, password).subscribe({
      next: data => {
        console.log(data.isActive);
        if (data.isActive) {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.authService.loggedIn.next(true);
          
          this.router.navigate(['home']).then(() => {
            window.location.reload();

          });
        } else {
          this.errorMessage = "votre compte n'est pas encore actif, veuillez vérifier votre e-mail pour vérifier votre compte !";
          this.isLoginFailed = true;
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

}
