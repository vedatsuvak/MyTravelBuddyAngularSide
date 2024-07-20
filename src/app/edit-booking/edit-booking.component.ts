import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookCabServiceService } from '../book-cab-service.service';
import { Router } from '@angular/router';
import { SessionService } from '../session-service.service';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {
  bookingId: number;
  myBooking: any = {};
  message: any;
  bookingDate: any;
  bookingTime: any;
  paymentType: any;

  constructor(
    private route: ActivatedRoute,
    private bookCabService: BookCabServiceService,
    private router: Router,
    private sessionService: SessionService,
  ) {
  }

  ngOnInit() {
    if (!this.sessionService.getSession()) {
      this.router.navigate(['/login']);
    } else {
      this.bookingId = this.route.snapshot.params['id'];
      console.log('Booking ID:', this.bookingId);

      this.bookCabService.getBookingById(this.bookingId).subscribe(
        (data: any) => {
          this.myBooking = data;
        },
        (error: any) => {
          console.error('Error fetching booking details:', error);
        }
      );
    }
  }

  isBookingEditable(myBooking: any): boolean {
    const currentDateTime = new Date();
    const bookingDateTime = new Date(`${myBooking.bookingDate} ${myBooking.bookingTime}`);
    return currentDateTime < bookingDateTime;
  }

  updateBooking(bookingId: number, myBooking: any) {
    if (this.isBookingEditable(myBooking)) {
      this.bookCabService.updateBooking(bookingId, myBooking.bookingDate, myBooking.bookingTime, myBooking.paymentType).subscribe(
        (data: String) => {
            this.message = data;
            console.log(this.message)
        },
        (error: any) => {
          console.error('HTTP error during update:', error);
        }
      );
      this.router.navigate(['/myBookings']);
    }
    else{
      window.alert('You can not set past time. Please select future date/time.');
    }
  }
}
