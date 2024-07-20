import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HotelBookingsService } from '../hotel-bookings.service';
import { SessionService } from '../session-service.service';
import { HotelBookings } from '../HotelBookings.model';

@Component({
  selector: 'app-my-hotel-bookings',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatDialogModule],
  templateUrl: './my-hotel-bookings.component.html',
  styleUrl: './my-hotel-bookings.component.css'
})
export class MyHotelBookingsComponent implements OnInit{
  bookedHotels: HotelBookings [] = [];
  user: any;

  constructor(
    private hotelBookingService: HotelBookingsService,
    private sessionService: SessionService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user = this.sessionService.getSession();
    if (this.user) {
      this.fetchBookedHotels();
    } else {
      console.error('User not logged in');
    }
  }
  fetchBookedHotels(): void {
    this.hotelBookingService.getHotelByUserId(this.user.id).subscribe(
      (hotels: HotelBookings[]) => {
        this.bookedHotels = hotels;
      },
      (error) => {
        console.error('Failed to fetch booked flights', error);
      }
    );
  }

}
