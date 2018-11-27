import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  token: string;
  userId: string;
  constructor(private router: ActivatedRoute, private route: Router, private authService: AuthService ) {}

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.token = params['token'];
      this.userId = params['user'];

      this.authService.confirmEmail(this.token, this.userId).subscribe(response => {
        this.route.navigateByUrl('/logIn');
      });
  });
  }

}
