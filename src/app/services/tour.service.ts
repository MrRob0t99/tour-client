import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetTours } from '../model/get-tours.model';
import { DataService } from './data.service';
import { Tour } from '../model/tour.model';

@Injectable({
  providedIn: 'root'
})
export class TourService extends DataService {

  httpClient: HttpClient;
  constructor(http: HttpClient) {
    super(http, 'https://tourserver20181125101924.azurewebsites.net/api/Tour/');
    this.httpClient = http;
  }

  sendFiles(listUrl: Array<any>, tourId: number) {
    const uploadData = new FormData();
    listUrl.forEach(f => {
      uploadData.append('files', f.value, f.value.name);
    });

    return this.httpClient.post('https://tourserver20181125101924.azurewebsites.net/api/Tour/file/' + tourId, uploadData);
  }

}
