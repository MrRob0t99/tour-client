import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Country } from '../model/country.model';
import { City } from '../model/city.model';
import { Options, LabelType } from 'ng5-slider';
import { CityService } from '../services/city.service';
import { TourService } from '../services/tour.service';
import { GetTours } from '../model/get-tours.model';
import { CountryService } from '../services/country.service';
import { BusketService } from '../services/busket.service';
import { Tour } from '../model/tour.model';
import { HttpParams } from '@angular/common/http';
import { GetToursResponse } from '../model/get-tour.respose';
import { ExpectedService } from '../services/expected.service';

@Component({
  selector: 'app-get-all-tour',
  templateUrl: './get-all-tour.component.html',
  styleUrls: ['./get-all-tour.component.css']
})

export class GetAllTourComponent {
  collection = Array<any>();
  curentPage: any;
  size: number;
  currentSize: number;
  listCountry: Array<Country>;
  listCity: Array<City>;
  selectedCountry = 0;
  selectedCity = 0;
  hotels: Array<City>;
  index = -1;
  minValue = 0;
  maxValue = 50000;

  searchString = '';

  counter = 0;

  options: Options = {
    step: 100,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b>' + value;
        case LabelType.High:
          return '<b>Max price:</b>' + value;
        default:
          return value.toString();
      }
    }
  };
  constructor(public sanitizer: DomSanitizer,
    private router: Router, private cityService: CityService, private tourService: TourService,
    private countryService: CountryService, private busketServices: BusketService,
    private erorrHandler: ExpectedService) {
    this.size = 9;
    this.getItems(1);
  }
  goTo(id: any) {
    this.router.navigateByUrl('/get-tour/' + id);
  }


  getList(list: Array<any>): Array<any> {
    return list.slice(1);
  }

  search() {
    const option = new GetTours();
    option.searchString = this.searchString;

    this.getItems(1, option);
  }

  cangePage($event) {
    console.log($event);
    this.getItems($event);
  }

  applyFilter() {
    this.getItems();
  }

  clearFilter() {
    this.selectedCountry = 0;
    this.selectedCity = 0;
    this.minValue = 0;
    this.maxValue = 50000;
    this.getItems(1);
  }

  getItems(page: number = 1, defOption: GetTours = null) {

    let httpParams = new HttpParams().append('page', page.toString())
      .append('size', this.size.toString())
      .append('min', this.minValue.toString())
      .append('max', this.maxValue.toString())
      .append('countryId', this.selectedCountry.toString())
      .append('cityId', this.selectedCity.toString());
    if (this.searchString !== '') {
      httpParams = httpParams.append('search', this.searchString);
    }

    this.tourService.getAll<GetToursResponse>(httpParams).subscribe(response => {
      console.log(response.data);
      this.collection = new Array<any>(response.data.count);
      let counter = 0;
      const startIndex = (page - 1) * this.size;
      const endIndex = response.data.listTour.length + startIndex;
      for (let i = startIndex; i < endIndex; i++) {
        this.collection[i] = response.data.listTour[counter];
        counter++;
      }
      console.log(this.collection);
      console.log(page);
      this.curentPage = page;
      this.getCountries();

    }, this.erorrHandler.handle);
  }

  getCountries() {
    this.countryService.getAll<Array<Country>>()
      .subscribe(respose => {
        this.listCountry = respose.data;
      }, this.erorrHandler.handle);
  }

  getCities(id: number) {
    this.cityService.getById<Array<City>>(id)
      .subscribe(response => {
        this.listCity = response.data;
      }, this.erorrHandler.handle);
  }

  onChange(event) {
    this.selectedCountry = event.value;

    this.listCity = null;
    this.getCities(event.value);
  }

  onChangeCity(event) {
    this.selectedCity = event.value;
  }

  addToBusket(tourId: number) {
    this.busketServices.post({ tourId: tourId }).subscribe(response => {
      alert('Added to busket');
    }, this.erorrHandler.handle);
  }
}

