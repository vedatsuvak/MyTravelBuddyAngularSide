import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import { HotelSearchComponent } from './hotel-search/hotel-search.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { BookCabComponent } from './book-cab/book-cab.component';
import { MyCabBookingsComponent } from './my-cab-bookings/my-cab-bookings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditBookingComponent } from './edit-booking/edit-booking.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { BookHotelComponent } from './book-hotel/book-hotel.component';
import { HotelinsertComponent } from './hotelinsert/hotelinsert.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { ToastrModule } from 'ngx-toastr';
import { HotelsListComponent } from './hotels-list/hotels-list.component';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';
import { FlightInsertComponent } from './flight-insert/flight-insert.component';
import { FlightsListComponent } from './flights-list/flights-list.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { DestinationInsertComponent } from './destination-insert/destination-insert.component';
import { DestinationListComponent } from './destination-list/destination-list.component';
import { DestinationEditComponent } from './destination-edit/destination-edit.component';
import { CabInsertComponent } from './cab-insert/cab-insert.component';
import { CabListComponent } from './cab-list/cab-list.component';
import { CabEditComponent } from './cab-edit/cab-edit.component';
import { UsersListComponent } from './users-list/users-list.component';
import { FlightResultComponent } from './flight-result/flight-result.component';
import { FlightBookingComponent } from './flight-booking/flight-booking.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';
import {MyFlightBookingsComponent} from "./my-flight-bookings/my-flight-bookings.component";
import {MyHotelBookingsComponent} from "./my-hotel-bookings/my-hotel-bookings.component";


const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "register", component: RegistrationComponent },
  { path: "login", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "edit-user", component: EditUserComponent },
  { path: "book-cab", component: BookCabComponent },
  { path: "myCabBookings", component: MyCabBookingsComponent },
  { path: "editBooking/:id", component: EditBookingComponent },
  { path: "book-flight", component: BookFlightComponent },
  { path: "book-hotel", component: BookHotelComponent },
  { path: "hotelinsert", component: HotelinsertComponent },
  { path: "adminpanel", component: AdminpanelComponent },
  { path: 'hotel-edit/:id', component: HotelEditComponent },
  { path: 'flight-insert', component: FlightInsertComponent },
  { path: 'flights-list', component: FlightsListComponent },
  { path: 'flight-edit/:id', component: FlightEditComponent },
  { path: 'destination-insert', component: DestinationInsertComponent },
  { path: 'destination-list', component: DestinationListComponent },
  { path: 'destination-edit/:id', component: DestinationEditComponent },
  { path: 'cab-insert', component: CabInsertComponent },
  { path: 'cab-list', component: CabListComponent },
  { path: 'cab-edit/:id', component: CabEditComponent },
  { path: 'users-list', component: UsersListComponent },
  { path: 'flight-result', component: FlightResultComponent },
  { path: 'flight-booking', component: FlightBookingComponent },
  { path: 'my-flight-bookings', component: MyFlightBookingsComponent },
  { path: "hotelsearch", component: HotelSearchComponent },
  { path: "my-hotel-bookings", component: MyHotelBookingsComponent },


];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    RegistrationComponent,
    HotelSearchComponent,
    LoginComponent,
    DashboardComponent,
    EditUserComponent,
    BookCabComponent,
    MyCabBookingsComponent,
    EditBookingComponent,
    BookFlightComponent,
    BookHotelComponent,
    HotelinsertComponent,
    AdminpanelComponent,
    HotelsListComponent,
    HotelEditComponent,
    FlightInsertComponent,
    FlightsListComponent,
    FlightEditComponent,
    DestinationInsertComponent,
    DestinationListComponent,
    DestinationEditComponent,
    CabInsertComponent,
    CabListComponent,
    CabEditComponent,
    UsersListComponent,
    FlightResultComponent,
    FlightBookingComponent,
    PaymentDialogComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    ReactiveFormsModule,

  ],
  exports: [
    PaymentDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
