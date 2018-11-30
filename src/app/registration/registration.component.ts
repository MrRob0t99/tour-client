import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user.model';
import { ExpectedService } from '../services/expected.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  hidePassword: boolean;
  hideConfirmPassword: boolean;

  constructor(private authService: AuthService, private errorHandler: ExpectedService,
    private route: Router) {
    this.hidePassword = true;
    this.hideConfirmPassword = true;
    this.registrationForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required]),
      'lastName': new FormControl('', Validators.required),
      'userName': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required,
      Validators.pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$'))]),
      'confirmPassword': new FormControl('', [Validators.required]),
    });


  }

  hide(isHide: boolean) {
    if (isHide) {
      return 'visibility_off';
    } else {
      return 'visibility';
    }
  }
  isEquels(): boolean {
    const password = this.registrationForm.controls.password.value;
    const confirmPassword = this.registrationForm.controls.confirmPassword.value;
    if (password === confirmPassword) {
      return false;
    }
    return true;
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get firstName() {
    return this.registrationForm.get('firstName');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get lastName() {
    return this.registrationForm.get('lastName');
  }

  get userName() {
    return this.registrationForm.get('userName');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }


  submit() {
    const user = new User();
    user.firstName = this.registrationForm.controls.firstName.value,
      user.lastName = this.registrationForm.controls.lastName.value,
      user.email = this.registrationForm.controls.email.value,
      user.password = this.registrationForm.controls.password.value,
      user.confirmPassword = this.registrationForm.controls.confirmPassword.value,
      user.userName = this.registrationForm.controls.userName.value;
    this.authService.registration(user)
      .subscribe(response => {
        alert('Please confirm your registration. On you email was send message');
        this.route.navigateByUrl('/tours');
      }, error => {
        this.errorHandler.handle(error);
      });
  }
}
