import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { Order } from '../model/order.model';
import { ExpectedService } from '../services/expected.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';
import { TypeOfFood } from '../model/type-food.model';
import { CityEnum } from '../model/city-enum.model';

@Component({
  selector: 'app-history-orders',
  templateUrl: './history-orders.component.html',
  styleUrls: ['./history-orders.component.css']
})
export class HistoryOrdersComponent {

  Items: any;
  TypeOfFood = TypeOfFood;
  CityEnum = CityEnum;

  constructor(private orderService: OrderService, private router: Router, public dialog: MatDialog,
    private errorHandler: ExpectedService) {
    this.getItem();
  }

  getStatus(status: boolean) {
    if (status) {
      return 'Confirmed';
    } else {
      return 'Pending';
    }
  }

  getItem() {
    this.orderService.getAll<Array<Order>>()
      .subscribe(response => {
        this.Items = response.data;
      }, this.errorHandler.handle);
  }
  goTo(tourId: number) {
    this.router.navigateByUrl('/get-tour/' + tourId);
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      height: '250px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.deleteOrder(id);
      }
    });

  }

  deleteOrder(tourId: number) {
    this.orderService.delete(tourId).subscribe(response => {
      this.getItem();
    });
  }

}
