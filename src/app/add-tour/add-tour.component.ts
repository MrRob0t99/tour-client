import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AddHotelComponent } from '../add-hotel/add-hotel.component';
import { Hotel } from '../model/hotel.model';
import { Country } from '../model/country.model';
import { City } from '../model/city.model';
import { CityService } from '../services/city.service';
import { CountryService } from '../services/country.service';
import { HotelService } from '../services/hotel.service';
import { TourService } from '../services/tour.service';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { ExpectedService } from '../services/expected.service';
import { Router } from '@angular/router';
import { AddPlaceComponent } from '../add-place/add-place.component';
import { ExceptionHandlerService } from '../exception-handler.service';

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.css']
})
export class AddTourComponent {
  addTour: FormGroup;
  selectHotel: Hotel;

  listUrl = new Array<any>();
  listCountry = new Array<Country>();
  hotels = new Array<Hotel>();
  listCities = new Array<City>();

  selectedCountry = 0;
  selectedCity = 0;
  selectedHotel = 0;

  ShowDetail = false;

  showId: number;

  constructor(private hotelService: HotelService, private router: Router,
    public dialog: MatDialog, private cityService: CityService, private countryService: CountryService,
    private errorHandler: ExceptionHandlerService, private tourService: TourService) {
    this.getCountries();
    this.addTour = new FormGroup({
      'name': new FormControl('', Validators.required),
      'price': new FormControl('', [Validators.required, Validators.pattern('^[0-9,.]*$')]),
    });
  }

  getList(): Array<any> {
    const list = this.listUrl.slice(1);
    return list;
  }

  mouseEnter(id: number) {
    this.showId = id;
    this.setHotel();
    this.ShowDetail = true;
  }

  mouseLeave(obj: any) {
    this.ShowDetail = false;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event2) => {
        let item: any;
        item = event2.target;
        if (event.target.files[0].type.match('image.*')) {
          this.listUrl.push({ key: item.result, value: event.target.files[0] });
        } else {
          alert('Type not support');
        }
      };
    }
  }

  close(item): void {
    const index: number = this.listUrl.indexOf(item);
    if (index !== -1) {
      this.listUrl.splice(index, 1);
    }
    const element = document.getElementById('firstElem');
    element.className = 'item active';
  }

  getCountries() {
    this.countryService.getAll<Array<Country>>()
      .subscribe(respose => {
        this.listCountry = respose.data;
      });
  }

  getCities(countryId: number) {
    this.cityService.getById<Array<City>>(countryId)
      .subscribe(respose => {
        this.listCities = respose.data;
      }, error => this.errorHandler.handle(error));
  }

  getHotels(cityId: number) {
    this.hotelService.getById<Array<Hotel>>(cityId)
      .subscribe(respose => {
        this.hotels = respose.data;
      }, this.errorHandler.handle);
  }

  onChange(event) {
    this.listCities = null;
    if (event.value === 'addCountry') {
      this.openDialog();
    } else {
      this.getCities(event.value);
    }
  }

  onChangeCity(event) {
    if (event.value === 'addCity') {
      this.openDialogCity();
    } else {
      this.getHotels(event.value);
    }
  }

  onChangeHotel(event) {
    if (event.value === 'addHotel') {
      this.openDialogHotel();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlaceComponent, {
      width: '350px',
      height: '160px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        const id = this.listCountry[0].id;
        this.selectedCountry = id;
        this.getCities(id);
      } else {
        this.createCountry(result);
      }
    });
  }

  openDialogCity(): void {
    const dialogRef = this.dialog.open(AddPlaceComponent, {
      width: '350px',
      height: '160px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        const id = this.listCities[0].id;
        this.selectedCity = id;
        this.getHotels(id);
      } else {
        this.createCity(result);
      }
    });
  }

  openDialogHotel(): void {
    const dialogRef = this.dialog.open(AddHotelComponent, {
      width: '400px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        this.selectedHotel = this.hotels[0].id;
      } else {
        this.createHotel(result);
      }
    });
  }

  send(tourId: number) {
    this.tourService.sendFiles(this.listUrl, tourId)
      .subscribe(response => {
        this.router.navigateByUrl('/get-tour/' + tourId);
      }, this.errorHandler.handle);
  }

  createCountry(name: string) {
    const body = { name: name };
    this.countryService.post(body)
      .subscribe(response => {
        this.getCountries();
        this.selectedCountry = response.data;
        this.getCities(this.selectedCountry);
      }, error => {
        const id = this.listCountry[0].id;
        this.selectedCountry = id;
        this.getCities(id);
        this.errorHandler.handle(error);
      });
  }

  createCity(name: string) {
    const newCity = {
      countryId: this.selectedCountry,
      cityName: name
    };

    this.cityService.post(newCity)
      .subscribe(response => {
        this.getCities(this.selectedCountry);
        this.selectedCity = response.data;
        this.getHotels(this.selectedCity);
      }, error => {
        const id = this.listCities[0].id;
        this.selectedCity = id;
        this.getHotels(id);
        this.errorHandler.handle(error);
      });
  }

  createHotel(hotel: Hotel) {
    hotel.cityId = this.selectedCity;
    this.hotelService.post(hotel)
      .subscribe(response => {
        this.getHotels(this.selectedCity);
        this.selectedHotel = response.data;
      }, this.errorHandler.handle);
  }

  setHotel(): void {
    if (this.showId) {
      let item: any;
      for (let i = 0; i < this.hotels.length; i++) {
        item = this.hotels[i];
        if (item.id === this.showId) {
          this.selectHotel = this.hotels[i];
          break;
        }
      }
    }
  }

  createTour() {
    const body = {
      name: this.addTour.controls.name.value,
      price: Number(this.addTour.controls.price.value),
      hotelId: this.selectedHotel,
    };

    this.tourService.post(body)
      .subscribe(response => {
        this.send(response.data);
      }, this.errorHandler.handle);
  }
}
