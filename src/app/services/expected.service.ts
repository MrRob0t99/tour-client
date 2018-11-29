import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpectedService {

  constructor() { }

  handle(error: any) {
    if (error && error.errorDescription) {
      const descr = error.errorDescription;
      alert(descr);
    } else {
      throw error;
    }

  }
}
