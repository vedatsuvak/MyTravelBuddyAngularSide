import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../hotels.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session-service.service';
import { Hotels } from '../hotels.model';
import { differenceInDays } from 'date-fns';
import { HotelBookingsService } from "../hotel-bookings.service";
import { MatDialog } from '@angular/material/dialog';
import { PaymentDialogComponent } from "../payment-dialog/payment-dialog.component";
import { HotelBookings } from "../HotelBookings.model";

@Component({
  selector: 'app-book-hotel',
  templateUrl: './book-hotel.component.html',
  styleUrls: ['./book-hotel.component.css']
})
export class BookHotelComponent implements OnInit {
  hotels: Hotels[] = [];
  location: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';
  totalStay: number = 0;
  totalPrice: number = 0;
  newHotelBookings: HotelBookings;

  constructor(
    private hotelsService: HotelsService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private hotelBookingsService: HotelBookingsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.checkAuthorization();
    console.log(this.sessionService.getSession())
    this.route.queryParams.subscribe(params => {
      this.location = params['location'] || '';
      this.checkInDate = params['checkInDate'] || '';
      this.checkOutDate = params['checkOutDate'] || '';

      if (this.location && this.checkInDate && this.checkOutDate) {
        this.totalStay = differenceInDays(new Date(this.checkOutDate), new Date(this.checkInDate)) + 1;
        this.getHotelsByLocation(this.location, this.checkInDate, this.checkOutDate);
      } else {
        this.toastr.warning('Location or dates are missing.', 'Missing Data');
      }
    });

    const loggedInUser = this.sessionService.getSession();
    if (loggedInUser) {
      this.newHotelBookings = {
        checkInDate: "",
        checkOutDate: "",
        hotelId: 0,
        hotelName: "",
        location: "",
        numberOfRooms: 0,
        totalPrice: 0,
        userId: loggedInUser.id,
      };
    }
  }

  getHotelsByLocation(location: string, checkInDate: string, checkOutDate: string): void {
    this.hotelsService.getHotelsByLocation(location, checkInDate, checkOutDate).subscribe(
      (hotels: Hotels[]) => {
        this.hotels = hotels;
      },
      (error) => {
        console.error('Error fetching hotels:', error);
        this.toastr.error('Failed to fetch hotels. Please try again later.', 'Error');
      }
    );
  }

  calculateTotalPrice(baseFare: number): number {
    this.totalPrice = baseFare * this.totalStay;
    return this.totalPrice;
  }

  checkAuthorization(): void {
    const loggedInUser = this.sessionService.getSession();
    if (!loggedInUser) {
      this.router.navigate(['/login']);
      this.toastr.error('You are not authorized to access this page.', 'Unauthorized');
    }
  }

  openPaymentDialog(hotel: Hotels): void {
    const bookingDetails = {
      ...this.newHotelBookings,
      hotelId: hotel.hotelId,
      hotelName: hotel.hotelName,
      location: hotel.location,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      totalPrice: this.calculateTotalPrice(hotel.baseFare),
      numberOfRooms: 1,
    };

    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '450px',
      data: { bookingDetails }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result.success) {
        this.bookHotel(bookingDetails);
      } else if (result && !result.success) {
        this.toastr.error('Sorry, payment failed. Please try again!', 'Error');
      }
    });
  }

  bookHotel(bookingDetails: HotelBookings): void {
    this.hotelBookingsService.bookHotel(bookingDetails).subscribe(
      (response) => {
        this.toastr.success('Hotel booked successfully!', 'Success');
        this.router.navigate(['/my-hotel-bookings']);
      },
      (error) => {
        console.error('Error booking hotel:', error);
        this.toastr.error('Failed to book hotel. Please try again later.', 'Error');
      }
    );
  }
}
