import { Component } from '@angular/core';
import {MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css']
})
export class AddPlaceComponent {

  public constructor(public dialogRef: MatDialogRef<AddPlaceComponent>) {
  }
    newItem: string;
    close(): void {
      this.dialogRef.close();
    }

  }

