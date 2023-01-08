import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/_service/auth.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import * as auth from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public showPassword: boolean | undefined;
  form: any = {
    email: null,
    password: null
  };
  userData: any;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  role: string[] = ['user'];
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
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
          this.roles = this.tokenStorage.getUser().roles;

          this.router.navigate(['/home']).then(() => {
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

  reloadPage(): void {
    window.location.reload();
  }

  GoogleLogin(): void {
    this.afAuth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((result) => {
        this.userData = result.additionalUserInfo?.profile;
        this.authService.Sociallogin(this.userData.given_name, this.userData.family_name, result.user?.email, this.role).subscribe({
          next: data => {

            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUser(data);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;

            window.location.pathname = 'home';

          },
          error: err => {
            this.errorMessage = "Cet email est déjà utilisé!";
            this.isLoginFailed = true;
          }
        });
      })
      .catch((error) => {
        this.errorMessage = "Cet email est déjà utilisé avec autre fournisseur!";
      });

  }




  FacebookLogin(): void {
    this.afAuth.signInWithPopup((new auth.FacebookAuthProvider()))
      .then((result) => {
        this.userData = result.additionalUserInfo?.profile;

        this.authService.Sociallogin(this.userData.first_name, this.userData.last_name, result.user?.email, this.role).subscribe({
          next: data => {
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUser(data);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });
          },
          error: err => {
            this.errorMessage = "Cet email est déjà utilisé!";
            this.isLoginFailed = true;
          }
        });
      })
      .catch((error) => {
        this.errorMessage = "Cet email est déjà utilisé avec autre fournisseur!";
      });
  }

}
