import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FlightBookingService } from '../flight-booking.service';
import { SessionService } from '../session-service.service';
import { FlightBookingsModel, PassengerDetails } from '../flight-bookings.model';
import { PassengerDialogComponent } from '../passenger-dialog/passenger-dialog.component';
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-my-flight-bookings',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatDialogModule, MatButtonModule],
  templateUrl: './my-flight-bookings.component.html',
  styleUrls: ['./my-flight-bookings.component.css'],
})
export class MyFlightBookingsComponent implements OnInit {
  bookedFlights: FlightBookingsModel[] = [];
  user: any;

  constructor(
    private bookedFlightsService: FlightBookingService,
    private sessionService: SessionService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user = this.sessionService.getSession();
    if (this.user) {
      this.fetchBookedFlights();
    } else {
      console.error('User not logged in');
    }
  }

  fetchBookedFlights(): void {
    this.bookedFlightsService.getFlightsByUserId(this.user.id).subscribe(
      (flights: FlightBookingsModel[]) => {
        this.bookedFlights = flights;
      },
      (error) => {
        console.error('Failed to fetch booked flights', error);
      }
    );
  }

  openPassengerDialog(passengers: PassengerDetails[]): void {
    this.dialog.open(PassengerDialogComponent, {
      width: '450px',
      data: { passengers }
    });
  }
}
