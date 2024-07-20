import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FlightService } from '../flight.service';
import { Flights } from '../flights.model';
import {SessionService} from "../session-service.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-flight-result',
  templateUrl: './flight-result.component.html',
  styleUrls: ['./flight-result.component.css']
})
export class FlightResultComponent implements OnInit {
  flights: Flights[];
  departureCity: any;
  arrivalCity: any;
  date: any;
  passengers: any;

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightService,
    private sessionService: SessionService,
    private toastr: ToastrService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.checkAuthorization();
    this.route.queryParams.subscribe(params => {
      this.departureCity = params['departureCity'];
      this.arrivalCity = params['arrivalCity'];
      this.date = params['date'];
      this.passengers = params['passengers'];
      this.searchFlights(this.departureCity, this.arrivalCity, this.date, this.passengers);
    });
  }

  searchFlights(departureCity: string, arrivalCity: string, date: string, passengers: number): void {
    this.checkAuthorization();
    this.flightService.searchFlights(departureCity, arrivalCity, date, passengers).subscribe(
      (flights: Flights[]) => {
         this.flights = flights;
       },
       (error) => {
         console.error('Error fetching flights:', error);
       }
     );
  }
  checkAuthorization(): void {
    const loggedInUser = this.sessionService.getSession();
    if (!loggedInUser) {
      this.router.navigate(['/login']);
      this.toastr.error('You are not authorized to access this page.', 'Unauthorized');
    }
  }
  bookFlight(flight){
    this.router.navigate(['/flight-booking'], { queryParams: {
        flightId: flight.flightId,
        departureCity: flight.departureCity,
        arrivalCity: flight.arrivalCity,
        date: flight.date,
        time: flight.time,
        baseFare: flight.baseFare,
        passengers: this.passengers,
        planeName: flight.planeName
      }});
  }
}
