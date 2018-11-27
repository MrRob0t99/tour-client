import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddOrderComponent } from '../add-order/add-order.component';
import { MatDialog } from '@angular/material';
import { TourService } from '../services/tour.service';
import { BusketService } from '../services/busket.service';
import { ExpectedService } from '../services/expected.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-get-tour',
  templateUrl: './get-tour.component.html',
  styleUrls: ['./get-tour.component.css']
})
export class GetTourComponent implements OnInit {

  id: number;
  tour: any;
  listUrl = Array<string>();

  constructor(private router: ActivatedRoute, private route: Router, private dialog: MatDialog, private authService: AuthService,
    private tourService: TourService, private busketService: BusketService, private errorHandler: ExpectedService) {
  }

  ngOnInit() {
    this.id = this.router.snapshot.params['id'];
    this.get();
  }

  addToBusket() {
    this.busketService.post(this.id).subscribe(response => {

    }, this.errorHandler.handle);
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
      height: '570px'
    });
    dialogRef.componentInstance.tourPrice = this.tour.price;
    dialogRef.componentInstance.totalPrice = this.tour.price;
    dialogRef.componentInstance.tourId = this.tour.id;
    dialogRef.afterClosed().subscribe(result => {
      this.route.navigateByUrl('/orders');
    });
  }
  deleteTour() {
    this.tourService.delete(this.id).subscribe(response => {
      this.route.navigateByUrl('/tours');
    });
  }

}
