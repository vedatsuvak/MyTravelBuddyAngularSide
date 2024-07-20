import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { Flights } from '../flights.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {SessionService} from "../session-service.service";

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {
  departureCity: string = '';
  arrivalCity: string = '';
  date: string = '';
  passengers: number = 1;
  flights: Flights[];
  departureCities: string[];
  arrivalCities: string[];

  constructor(
    private flightService: FlightService,
    private toastr: ToastrService,
    private router: Router,
    private sessionService: SessionService

  ) { }

  ngOnInit(): void {
    this.checkAuthorization();
    this.loadFlights();
  }

  loadFlights(): void {
    this.checkAuthorization();
    this.flightService.getAllFlights().subscribe(
      (flights: Flights[]) => {
        this.flights = flights;
        this.departureCities = this.getUniqueDepartureCities();
        this.arrivalCities = this.getUniqueArrivalCities();
      },
      (error) => {
        console.error('Error fetching flights:', error);
      }
    );
  }

  getUniqueDepartureCities(): string[] {
    this.checkAuthorization();
    const uniqueCities: string[] = [];
    this.flights.forEach(flight => {
      if (!uniqueCities.includes(flight.departureCity)) {
        uniqueCities.push(flight.departureCity);
      }
    });
    return uniqueCities;
  }

  getUniqueArrivalCities(): string[] {
    this.checkAuthorization();
    const uniqueCities: string[] = [];
    this.flights.forEach(flight => {
      if (!uniqueCities.includes(flight.arrivalCity) && flight.departureCity !== flight.arrivalCity) {
        uniqueCities.push(flight.arrivalCity);
      }
    });
    return uniqueCities;
  }

  departureCityChange(): void {
    this.arrivalCities = this.getFilteredArrivalCities(this.departureCity);
    this.arrivalCity = '';
  }

  getFilteredArrivalCities(departureCity: string): string[] {
    this.checkAuthorization();
    return this.flights
      .filter(flight => flight.departureCity === departureCity && flight.departureCity !== flight.arrivalCity)
      .map(flight => flight.arrivalCity);
  }
  checkAuthorization(): void {
    const loggedInUser = this.sessionService.getSession();
    if (!loggedInUser) {
      this.router.navigate(['/login']);
      this.toastr.error('You are not authorized to access this page.', 'Unauthorized');
    }
  }
  submitBooking(): void {
    this.checkAuthorization();
    this.router.navigate(['/flight-result'], {
      queryParams: {
        departureCity: this.departureCity,
        arrivalCity: this.arrivalCity,
        date: this.date,
        passengers: this.passengers
      }
    });
  }
}
