import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RegistrationComponent } from "./registration/registration.component";
import { LoginComponent } from "./login/login.component";
import { MyCabBookingsComponent } from "./my-cab-bookings/my-cab-bookings.component";
import { HotelinsertComponent } from './hotelinsert/hotelinsert.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { HotelsListComponent } from "./hotels-list/hotels-list.component";
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';
import { FlightInsertComponent } from './flight-insert/flight-insert.component';
import { FlightsListComponent } from './flights-list/flights-list.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { DestinationInsertComponent } from './destination-insert/destination-insert.component';
import { DestinationListComponent } from './destination-list/destination-list.component';
import { DestinationEditComponent } from './destination-edit/destination-edit.component';
import { CabInsertComponent } from "./cab-insert/cab-insert.component";
import { CabListComponent } from "./cab-list/cab-list.component";
import { CabEditComponent } from "./cab-edit/cab-edit.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { FlightResultComponent } from "./flight-result/flight-result.component";
import { FlightBookingComponent } from "./flight-booking/flight-booking.component";
import { MyFlightBookingsComponent } from "./my-flight-bookings/my-flight-bookings.component";
import { HotelSearchComponent } from "./hotel-search/hotel-search.component";
import {BookHotelComponent} from "./book-hotel/book-hotel.component";
import {MyHotelBookingsComponent} from "./my-hotel-bookings/my-hotel-bookings.component";




const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'register', component: RegistrationComponent },
  { path: "login", component: LoginComponent },
  { path: "my-cab-bookings", component: MyCabBookingsComponent },
  { path: 'adminpanel', component: AdminpanelComponent },
  { path: 'hotelinsert', component: HotelinsertComponent },
  { path: 'hotelslist', component: HotelsListComponent },
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
  { path: "book-hotel", component: BookHotelComponent },
  { path: "my-hotel-bookings", component: MyHotelBookingsComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
