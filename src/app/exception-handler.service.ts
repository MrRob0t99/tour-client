import { Injectable } from '@angular/core';
import { AlertService } from './services/alert.service';


@Injectable({
  providedIn: 'root'
})
export class ExceptionHandlerService {

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
