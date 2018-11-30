import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddOrderComponent } from '../add-order/add-order.component';
import { MatDialog } from '@angular/material';
import { TourService } from '../services/tour.service';
import { BusketService } from '../services/busket.service';
import { ExpectedService } from '../services/expected.service';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';


@Component({
  selector: 'app-get-tour',
  templateUrl: './get-tour.component.html',
  styleUrls: ['./get-tour.component.css']
})
export class GetTourComponent implements OnInit {

  id: number;
  tour: any;
  listUrl = Array<string>();

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private dialog: MatDialog, public authService: AuthService,
    private tourService: TourService, private busketService: BusketService, private errorHandler: ExpectedService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.get();
  }

  addToBusket() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/logIn');
      return;
    }
    this.busketService.post({ tourId: this.id }).subscribe(_ => {
      this.busketService.getCount();
      this.alertService.success('Added to busket');
    }, error => {
      this.errorHandler.handle(error);
    });
  }

  get() {
    this.tourService.getById(this.id)
      .subscribe(response => {
        this.tour = response.data;
        this.listUrl = this.tour.fileModels;
      });
  }

  getList(): Array<any> {
    const list = this.listUrl.slice(1);
    return list;
  }

  toOrder() {
    const dialogRef = this.dialog.open(AddOrderComponent, {
      width: '400px',
      height: '620px'
    });
    dialogRef.componentInstance.tourPrice = this.tour.price;
    dialogRef.componentInstance.totalPrice = this.tour.price;
    dialogRef.componentInstance.tourId = this.tour.id;
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('/orders');
    });
  }

  deleteTour() {
    this.tourService.delete(this.id).subscribe(response => {
      this.router.navigateByUrl('');
    });
  }

}
