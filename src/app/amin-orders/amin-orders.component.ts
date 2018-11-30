import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../model/order.model';
import { TypeOfFood } from '../model/type-food.model';
import { CityEnum } from '../model/city-enum.model';
import { ExpectedService } from '../services/expected.service';

@Component({
  selector: 'app-amin-orders',
  templateUrl: './amin-orders.component.html',
  styleUrls: ['./amin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  constructor(private orderService: OrderService, private errorHandler: ExpectedService) { }

  Items: any;
  TypeOfFood = TypeOfFood;
  CityEnum = CityEnum;

  ngOnInit() {
    this.getItem();
  }
  getItem() {
    this.orderService.getAll<Array<Order>>(null, 'admin')
      .subscribe(response => {
        this.Items = response.data;
      }, this.errorHandler.handle);
  }
}
