import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FlightBookingsModel } from '../flight-bookings.model';
import { FlightBookingService } from '../flight-booking.service';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../session-service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.css'],
})
export class FlightBookingComponent implements OnInit {
  @ViewChild('paymentModal') paymentModal!: ElementRef;
  baseFare: number;
  user: any;
  insertForm: FormGroup;
  passengers: any;
  newFlightBookings: FlightBookingsModel = {
    flightBookingId: 0,
    flightId: 0,
    userId: 0,
    departureCity: '',
    arrivalCity: '',
    flightDate: '',
    flightTime: '',
    totalPrice: 0,
    bookedSeats: 0,
    airlineCompany: '',
    passengerInfo:[],
    bookingStatus: '',
    paymentMethod: '',
    transactionId: '',
  };

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private flightBooking: FlightBookingService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const loggedInUser = this.sessionService.getSession();
    if (!loggedInUser) {
      this.router.navigate(['/login']);
      return;
    } else {
      this.user = this.sessionService.getSession();
      this.insertForm = this.fb.group({
        passengerInfo: this.fb.array([], Validators.required),
        paymentMethod: ['', Validators.required],
      });
      this.route.queryParams.subscribe((params) => {
        this.newFlightBookings.flightId = params['flightId'];
        this.newFlightBookings.userId = this.user.id;
        this.newFlightBookings.departureCity = params['departureCity'];
        this.newFlightBookings.arrivalCity = params['arrivalCity'];
        this.newFlightBookings.flightDate = params['date'];
        this.newFlightBookings.flightTime = params['time'];
        this.baseFare = params['baseFare'];
        this.newFlightBookings.airlineCompany = params['planeName'];
        this.passengers = params['passengers'];
        this.newFlightBookings.bookedSeats = this.passengers;
        this.newFlightBookings.totalPrice = this.passengers * this.baseFare;

        const passengerInfoFormArray = this.insertForm.get('passengerInfo') as FormArray;
        passengerInfoFormArray.clear();

        for (let i = 0; i < this.passengers; i++) {
          const passengerFormGroup = this.fb.group({
            title: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            age: [null, Validators.required],
          });
          passengerInfoFormArray.push(passengerFormGroup);
          this.newFlightBookings.passengerInfo = passengerInfoFormArray.value;
        }
      });
    }
  }
  get passengerControls() {
    return (this.insertForm.get('passengerInfo') as FormArray).controls;
  }

  openPaymentDialog(): void {
    if (this.insertForm.valid) {
      const dialogRef = this.dialog.open(PaymentDialogComponent, {
        width: '450px',
        data: { flightDetails: this.newFlightBookings }
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result && result.success) {
          const passengerInfoFormArray = this.insertForm.get('passengerInfo') as FormArray;
          this.newFlightBookings.passengerInfo = passengerInfoFormArray.value;
          this.newFlightBookings.bookingStatus='confirmed';
          this.newFlightBookings.transactionId=this.generateTransactionId();
          this.submitBooking();
        } else if (result && !result.success) {
          this.toastr.error('Sorry, payment failed to book flight. Please try again!', 'Error');
        }
      });
    } else {
      this.toastr.error('Please fill in all required fields', 'Error');
    }
  }

  generateTransactionId(): string {
    const timestamp = new Date().getTime();
    return 'TXN' + timestamp.toString();
  }

  submitBooking(): void {
    if (this.insertForm.valid) {
      this.flightBooking.bookFlight(this.newFlightBookings).subscribe(
        (response) => {
          this.toastr.success('Booking successful, thank you for choosing us!', 'Success');
          this.router.navigate(['/my-flight-bookings'])
        },
        (error: HttpErrorResponse) => {
          this.toastr.error('Failed to book flight', 'Error');
          console.error('Error occurred:', error);
        }
      );
    } else {
      this.toastr.error('Please fill in all required fields', 'Error');
    }
  }
}
