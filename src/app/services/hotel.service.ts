import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class HotelService extends DataService {

  constructor(http: HttpClient) {
    super(http, 'https://tourserver20181125101924.azurewebsites.net/api/Hotel/');
  }
}
