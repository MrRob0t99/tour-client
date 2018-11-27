import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private route: Router, private authService: AuthService) { }

  canActivate() {
    if (this.authService.isAdmin) {
      return true;
    }

    this.route.navigateByUrl('/logIn');
    return false;
  }
}
