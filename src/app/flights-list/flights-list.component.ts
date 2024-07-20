import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { ToastrService } from 'ngx-toastr';
import { Flights } from '../flights.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {SessionService} from "../session-service.service";


@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css']
})
export class FlightsListComponent implements OnInit {
  flights: Flights[];
  errorMessage: string;

  constructor(
    private flightService: FlightService,
    private toastr: ToastrService,
    private router: Router,
    private sessionService: SessionService,

) { }

  ngOnInit(): void {
    const loggedInUser = this.sessionService.getSession();
    if (!loggedInUser || loggedInUser.username !== 'admin') {
      this.router.navigate(['/login']);
      this.toastr.error('You are not authorized to access this page.', 'Unauthorized');
      return;
    } else {
      this.getFlights();
    }
  }

  getFlights(): void {
    this.flightService.getAllFlights().subscribe(
      (flights: Flights[]) => {
        this.flights = flights;
      },
      (error) => {
        console.error('Error fetching flights:', error);
        this.errorMessage = 'Failed to fetch flights';
        this.toastr.error(this.errorMessage, 'Error');
      }
    );
  }

  deleteFlight(flightId: number): void {
    if (confirm('Are you sure you want to delete this flight?')) {
      this.flightService.deleteFlight(flightId).subscribe(
        () => {
          this.toastr.success('Flight deleted successfully', 'Success');
          this.getFlights();
        },
        (error) => {
          console.error('Error deleting flight:', error);
          if (error instanceof HttpErrorResponse && error.status === 200) {
            this.toastr.success('Flight deleted successfully', 'Success');
            this.getFlights();
          } else {
            this.errorMessage = 'Failed to delete flight';
            this.toastr.error(this.errorMessage, 'Error');
          }
        }
      );
    }
  }

  updateFlight(flightId: number): void {
    this.router.navigate(['flight-edit', flightId]);
  }
}
