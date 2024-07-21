import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Flights } from '../flights.model';
import { FlightService } from '../flight.service';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../session-service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-flight-insert',
  templateUrl: './flight-insert.component.html',
  styleUrls: ['./flight-insert.component.css']
})
export class FlightInsertComponent implements OnInit {
  insertForm: FormGroup;
  newFlight: Flights = {
    flightId: 0,
    planeName: '',
    planeCapacity: 0,
    remainingSeats: 0,
    date: '',
    time: '',
    departureCity: '',
    arrivalCity: '',
    baseFare: 0
  };
  message: string;

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const loggedInUser = this.sessionService.getSession();
    if (!loggedInUser || loggedInUser.username !== 'admin') {
      this.router.navigate(['/login']);
      this.toastr.error('You are not authorized to access this page.', 'Unauthorized');
      return;
    } else {
      this.insertForm = this.fb.group({
        planeName: ['', Validators.required],
        planeCapacity: ['', Validators.required],
        remainingSeats: ['', Validators.required],
        date: ['', Validators.required],
        time: ['', Validators.required],
        departureCity: ['', Validators.required],
        arrivalCity: ['', Validators.required],
        baseFare: ['', Validators.required]
      });
    }
  }

  onSubmit() {
    if (this.insertForm.valid) {
      this.newFlight = this.insertForm.value;
      this.flightService.insertFlight(this.newFlight).subscribe(
        (response: string) => {
          this.message = response;
          this.toastr.success('Flight inserted successfully', 'Success');
          //this.router.navigate(['/flights-list']);
        },
        (error) => {
          console.error('Error inserting flight:', error);
          if (error instanceof HttpErrorResponse && error.status === 200) {
            this.toastr.success('Flight inserted successfully', 'Success');
            this.router.navigate(['/flights-list']);
          } else {
            this.message = 'Failed to insert flight';
            this.toastr.error(this.message, 'Error');
          }
        }
      );
    } else {
      this.toastr.warning('Please fill in all required fields.', 'Warning');
    }
  }
}
