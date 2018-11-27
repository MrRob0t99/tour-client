import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Order } from '../model/order.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends DataService {
  constructor(http: HttpClient, private router: Router) {
    super(http, 'https://tourserver20181125101924.azurewebsites.net/api/Order/');
   }

   goTo(tourId: number) {
    this.router.navigateByUrl('/get-tour/' + tourId);
  }
}
