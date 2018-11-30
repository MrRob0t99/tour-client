import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { OrderService } from '../services/order.service';
import { CreateOrder } from '../model/create-order.model';
import { ExpectedService } from '../services/expected.service';
import { TypeOfFood } from '../model/type-food.model';
import { CityEnum } from '../model/city-enum.model';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent {

  listDuration: Array<number>;
  CityEnum = CityEnum;
  totalPrice: number;
  tourPrice: number;
  tourId: number;
  date: Date;
  TypeOfFood = TypeOfFood;
  selectedDuration = 7;
  selectedCountPeople = 1;
  selectedTypeOfFood: string;
  selectedCity: string;
  phoneNumber: string;
  minDate: Date;
  maxDate: Date;

  constructor(public dialogRef: MatDialogRef<AddOrderComponent>, private orderService: OrderService,
    private errorHandle: ExpectedService) {
    this.listDuration = [7, 14, 21, 28];
    this.selectedTypeOfFood = this.TypeOfFood[0];
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    this.minDate = new Date(yyyy, mm, dd + 1);
    this.maxDate = new Date(yyyy + 2, mm, dd);
  }

  countTotalPrice() {
    const oneDayCost = this.tourPrice / 7;
    let cost = (this.selectedDuration * oneDayCost) * this.selectedCountPeople;
    const procent = this.TypeOfFood[this.selectedTypeOfFood] / 10 * cost;
    cost = procent + cost;
    this.totalPrice = cost;
  }

  createOrder() {
    const options = new CreateOrder();
    options.tourId = this.tourId;
    options.cityEnum = this.CityEnum[this.selectedCity];
    options.typeOfFood = this.TypeOfFood[this.selectedTypeOfFood];
    options.phone = this.phoneNumber;
    options.startDate = this.date;
    options.countPeople = this.selectedCountPeople;
    options.duration = this.selectedDuration;
    options.totalPrice = this.totalPrice;

    this.orderService.post(options).subscribe(response => {
      this.dialogRef.close();
    }, this.errorHandle.handle);
  }

  close() {
    this.dialogRef.close();
  }
}
