import { Component } from '@angular/core';
import {MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Hotel } from '../model/hotel.model';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent {

  listRating: Array<number>;
  hotelForm: FormGroup;
  hotel = new Hotel;
  constructor(public dialogRef: MatDialogRef<AddHotelComponent>) {
    this.listRating = new Array<number>();
    for (let i = 1; i < 6; i++) {
      this.listRating.push(i);
    }
    this.hotelForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', [Validators.required, Validators.maxLength(500)]),
      'address': new FormControl('', Validators.required),
      'rating': new FormControl('', Validators.required),
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}
