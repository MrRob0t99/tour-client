import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusketService } from '../services/busket.service';
import { Busket } from '../model/busket.model';
import { ExpectedService } from '../services/expected.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AddOrderComponent } from '../add-order/add-order.component';

@Component({
  selector: 'app-busket',
  templateUrl: './busket.component.html',
  styleUrls: ['./busket.component.css']
})
export class BusketComponent implements OnInit {

  Items: Array<Busket>;
  constructor(private router: Router, private busketService: BusketService, public dialog: MatDialog,
    private errorHandler: ExpectedService) {
    this.getItem();
  }

  ngOnInit() {
  }

  getItem() {
    this.busketService.getAll<Array<Busket>>()
      .subscribe(response => {
        this.Items = response.data;
      }, this.errorHandler.handle);
  }

  goTo(id: any) {
    this.router.navigateByUrl('/get-tour/' + id);
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      height: '250px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.deleteFromBusket(id);
      }
    });
  }

  deleteFromBusket(tourId: number) {
    this.busketService.delete(tourId).subscribe(response => {
      this.getItem();
    });
  }

  toOrder(elem: any) {
    const dialogRef = this.dialog.open(AddOrderComponent, {
      width: '400px',
      height: '570px'
    });
    dialogRef.componentInstance.tourPrice = elem.price;
    dialogRef.componentInstance.totalPrice = elem.price;
    dialogRef.componentInstance.tourId = elem.tourId;
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('/orders');
      this.deleteFromBusket(elem.tourId);
    });
  }
}
