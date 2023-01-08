import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth-service.service';
import { TokenStorageService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  currentUser: any;
  constructor(private authService: AuthService, private router: Router, private token : TokenStorageService) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.currentUser = this.token.getUser();
    if (this.authService.isLoggedIn !== true && this.currentUser.roles.includes('ROLE_ADMIN')) {
      this.router.navigate(['/login']);
    }
    return true;
  }
  

  
  
}
