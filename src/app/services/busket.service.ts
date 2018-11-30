import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { AppResponse } from '../response/response';

@Injectable({
  providedIn: 'root'
})
export class BusketService extends DataService {

  httpClient: HttpClient;
  count = 0;
  constructor(http: HttpClient) {
    super(http, 'https://tourserver20181125101924.azurewebsites.net/api/Busket/');
    this.httpClient = http;
  }

  getCount() {
    this.httpClient.get<AppResponse<number>>('https://tourserver20181125101924.azurewebsites.net/api/Busket/count').subscribe(response => {
      this.count = response.data;
    });
  }
}
