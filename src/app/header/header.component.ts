import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Route, Router } from '@angular/router';
import { BusketService } from '../services/busket.service';
import { MatDialog } from '@angular/material';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  count = 2;
  constructor(public authService: AuthService, public busketService: BusketService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.busketService.getCount();
    }

  }

  openDialogAboutUs() {
    const dialogRef = this.dialog.open(AboutUsComponent);
  }

  openDialogContact() {
    const dialogRef = this.dialog.open(ContactComponent,
      {
        width: '300px',
        height: '400px'
      });
  }

}
