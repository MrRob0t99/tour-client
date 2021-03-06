import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})

export class ExpectedService {

  constructor(private alertService: AlertService) { }

  handle(error: any) {
    if (error && error.errorDescription) {
      const description = error.errorDescription;
     this.alertService.error(description);
    } else {
      throw error;
    }

  }
}
