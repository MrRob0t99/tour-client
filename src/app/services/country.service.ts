import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})

export class CountryService extends DataService {

  constructor(http: HttpClient) {
    super(http, 'https://tourserver20181125101924.azurewebsites.net/api/Country');
  }

}
