import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private authService: AuthService, private errorHandler: ExpectedService,
    private route: Router) {
    this.registrationForm = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'userName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
      'confirmPassword': new FormControl('', Validators.required),
    });
  }
  isEquels() {
    return this.registrationForm.controls.password.value === this.registrationForm.controls.confirmPassword.value;
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
      }, this.errorHandler.handle);
  }
}
