import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_service/auth.service';
import { TokenStorageService } from '../_service/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryguardGuard implements CanActivate {
  currentUser: any;
  constructor(private authService: AuthService, private router: Router, private token : TokenStorageService) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.currentUser = this.token.getUser();
    if (this.authService.isLoggedIn !== true && !this.currentUser.roles.includes('ROLE_DELIVERY')) {
      this.router.navigate(['/login']);
    }
    return true;
  }
  
}
