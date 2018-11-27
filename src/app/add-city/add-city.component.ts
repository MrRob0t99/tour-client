import { Component } from '@angular/core';
import {MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent {

  public constructor(public dialogRef: MatDialogRef<AddCityComponent>) {
  }
    newCity: string;
    onNoClick(): void {
      this.dialogRef.close();
    }

  }

