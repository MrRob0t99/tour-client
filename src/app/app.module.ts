import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { LogInComponent } from './log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AddTourComponent } from './add-tour/add-tour.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { GetAllTourComponent } from './get-all-tour/get-all-tour.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GetTourComponent } from './get-tour/get-tour.component';
import { Ng5SliderModule } from 'ng5-slider';
import { BusketComponent } from './busket/busket.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { HistoryOrdersComponent } from './history-orders/history-orders.component';
import { AuthService } from './services/auth.service';
import { BusketService } from './services/busket.service';
import { CityService } from './services/city.service';
import { CountryService } from './services/country.service';
import { HotelService } from './services/hotel.service';
import { OrderService } from './services/order.service';
import { TourService } from './services/tour.service';
import { AppErrorHandler } from './app-error-hendler';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { AdminOrdersComponent } from './amin-orders/amin-orders.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { AlertService } from './services/alert.service';
import { ExpectedService } from './services/expected.service';
import { ExceptionHandlerService } from './exception-handler.service';
import { AlertComponent } from './alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: '', component: GetAllTourComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'logIn', component: LogInComponent },
  { path: 'tour/add', component: AddTourComponent, canActivate: [AdminAuthGuardService] },
  { path: 'tour/:id', component: GetTourComponent },
  { path: 'confirmEmail', component: ConfirmEmailComponent },
  { path: 'orders', component: HistoryOrdersComponent, canActivate: [AuthGuardService] },
  { path: 'admin-order', component: AdminOrdersComponent, canActivate: [AuthGuardService] },
  { path: 'busket', component: BusketComponent, canActivate: [AuthGuardService] },
  { path: 'sss', component: ConfirmEmailComponent },
  { path: '**', component: NotFoundComponent }
];

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LogInComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AddTourComponent,
    AddHotelComponent,
    GetAllTourComponent,
    GetTourComponent,
    BusketComponent,
    AddOrderComponent,
    HistoryOrdersComponent,
    NotFoundComponent,
    ConfirmEmailComponent,
    ConfirmationDialogComponent,
    AboutUsComponent,
    ContactComponent,
    AdminOrdersComponent,
    AddPlaceComponent,
    AlertComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes),
    Ng5SliderModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['tourserver20181125101924.azurewebsites.net', 'localhost:1111']
      }
    }),
  ],
  providers: [
    MatDatepickerModule,
    AuthGuardService,
    AdminAuthGuardService,
    AuthService,
    BusketService,
    CityService,
    CountryService,
    HotelService,
    OrderService,
    TourService,
    ExceptionHandlerService,
    AlertService
    // { provide: ErrorHandler, useClass: AppErrorHandler }
  ],

  entryComponents: [AddTourComponent, AddPlaceComponent, AddHotelComponent, HeaderComponent,
    AboutUsComponent, GetTourComponent, AddOrderComponent, BusketComponent,
    ConfirmationDialogComponent, HistoryOrdersComponent, ContactComponent],

  bootstrap: [AppComponent]
})
export class AppModule { }
