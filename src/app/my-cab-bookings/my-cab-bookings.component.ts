import {Component, OnInit} from '@angular/core';
import {User} from '../User';
import {Router} from '@angular/router';
import {SessionService} from '../session-service.service';
import {BookCabServiceService} from '../book-cab-service.service';

@Component({
  selector: 'app-my-cab-bookings',
  templateUrl: './my-cab-bookings.component.html',
  styleUrls: ['./my-cab-bookings.component.css']
})
export class MyCabBookingsComponent implements OnInit {
  user: User = new User();
  message: any;
  myBookings: any;
  userId: any;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private bookCabService: BookCabServiceService,
  ) { }
  ngOnInit(): void {
    if (!this.sessionService.getSession()) {
      this.router.navigate(['/login']);
    } else {
      this.userId = this.sessionService.getSession().id;
      let response = this.bookCabService.myBookings(this.userId);
      response.subscribe(
        (data: any) => {
          this.myBookings = data;
        },
      );
    }
  }
  isBookingEditable(myBooking: any): boolean {
    const currentDateTime = new Date();
    const bookingDateTime = new Date(`${myBooking.bookingDate} ${myBooking.bookingTime}`);
    return currentDateTime < bookingDateTime;
  }
  editBooking(bookingId: number, myBooking: any) {
    if (this.isBookingEditable(myBooking)) {
      this.router.navigate(['/editBooking', bookingId]);
    } else {
      window.alert('This booking is not editable as the date and time have passed.');
    }
  }
  deleteBooking(bookingId: number, myBooking: any) {
    if (this.isBookingEditable(myBooking)) {
      const isConfirmed = window.confirm('Are you sure you want to delete this booking?');
      if (isConfirmed) {
        this.bookCabService.deleteBooking(bookingId).subscribe(
          (data: any) => {
            this.message = data;
            this.ngOnInit()
          },
        );
      }
    }else {
      window.alert('You can not delete this booking as the date and time have passed.');
    }
  }
}
