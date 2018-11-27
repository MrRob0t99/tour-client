import { Component } from '@angular/core';
import {MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})

export class AddCountryComponent {

  public constructor(public dialogRef: MatDialogRef<AddCountryComponent>) {

  }
  newCountry: string;
  onNoClick(): void {
    this.dialogRef.close();
  }

}
