import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../flight.service';
import { ToastrService } from 'ngx-toastr';
import { Flights } from '../flights.model';
import { SessionService } from '../session-service.service';


@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})
export class FlightEditComponent implements OnInit {
  flight: Flights;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
    private toastr: ToastrService,
    private sessionService: SessionService,

  ) { }

  ngOnInit(): void {
    const loggedInUser = this.sessionService.getSession();
    if (!loggedInUser || loggedInUser.username !== 'admin') {
      this.router.navigate(['/login']);
      this.toastr.error('You are not authorized to access this page.', 'Unauthorized');
      return;
    } else {
      const flightId = +this.route.snapshot.paramMap.get('id');
      this.getFlight(flightId);
    }
  }

  getFlight(id: number): void {
    this.flightService.getFlightById(id).subscribe(
      (flight: Flights) => {
        this.flight = flight;
      },
      (error) => {
        console.error('Error fetching flight:', error);
        this.errorMessage = 'Failed to fetch flight';
        this.toastr.error(this.errorMessage, 'Error');
      }
    );
  }

  updateFlight(): void {
    this.flightService.updateFlight(this.flight).subscribe(
      () => {
        this.toastr.success('Flight updated successfully', 'Success');
        this.router.navigate(['/flights-list']);
      },
      (error) => {
        console.error('Error updating flight:', error);
        this.errorMessage = 'Failed to update flight';
        this.toastr.error(this.errorMessage, 'Error');
      }
    );
  }
}
