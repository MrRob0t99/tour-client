import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Token } from '../model/token';
import { AuthService } from '../services/auth.service';
import { ExpectedService } from '../services/expected.service';
import { BusketService } from '../services/busket.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  hide = true;
  token: Token;
  invalidLogin = false;

  logInForm: FormGroup;
  constructor(private router: Router, private authService: AuthService, private busketService: BusketService,
    private errorHandler: ExpectedService) {
    this.logInForm = new FormGroup({
      'userName': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
    });
  }

  logIn() {
    this.authService.logIn(this.logInForm.controls.userName.value, this.logInForm.controls.password.value)
      .subscribe((response) => {
        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);
          this.busketService.getCount();
          this.router.navigate(['']);
        }
        this.invalidLogin = true;
      }, error => {
        this.errorHandler.handle(error);
      });
  }
}
