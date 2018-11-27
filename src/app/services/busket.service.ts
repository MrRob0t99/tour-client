import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class BusketService extends DataService {

  httpClient: HttpClient;
  constructor(http: HttpClient) {
    super(http, 'https://tourserver20181125101924.azurewebsites.net/api/Busket/');
    this.httpClient = http;
  }

  getCount() {
    return this.httpClient.get('https://tourserver20181125101924.azurewebsites.net/api/Busket/count');
  }
}
