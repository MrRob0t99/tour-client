import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Token } from '../model/token';
import { User } from '../model/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppResponse } from '../response/response';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri = 'https://tourserver20181125101924.azurewebsites.net/api/Auth/';
  constructor(private http: HttpClient, private router: Router) { }

  private handlerError(response: HttpErrorResponse) {
    return Observable.throw(response.error.error);
  }

  logIn(userName: string, password: string) {
    return this.http.post<AppResponse<Token>>(this.uri + 'token',
      {
        userName: userName,
        password: password
      }).catch(this.handlerError);
  }

  registration(user: User) {
    return this.http.post(this.uri + 'registration', user).catch(this.handlerError);
  }

  confirmEmail(token: string, userId: string) {
    return this.http.put(this.uri + 'confirmEmail', {}, {
      params: {
        token: token,
        userId: userId
      }
    }).catch(this.handlerError);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }

  isLoggedIn(): boolean {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }
    const isExpired = jwtHelper.isTokenExpired(token);

    return !isExpired;
  }

  isAdmin() {
    const currentUser = this.currentUser;
    return currentUser.Roles === 'Admin';
  }

  get currentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return new JwtHelperService().decodeToken(token);
  }

}
