import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hotels } from '../hotels.model';
import { HotelsService } from '../hotels.service';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../session-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotelinsert',
  templateUrl: './hotelinsert.component.html',
  styleUrls: ['./hotelinsert.component.css']
})
export class HotelinsertComponent implements OnInit {
  insertForm: FormGroup;
  newHotel: Hotels = {
    hotelId: 0,
    location: '',
    hotelName: '',
    hotelRating: '',
    date: '',
    availableRooms: 0,
    baseFare: 0
  };
  message: string;
  constructor(
    private fb: FormBuilder,
    private hotelsService: HotelsService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const loggedInUser = this.sessionService.getSession();
    if (!loggedInUser || loggedInUser.username !== 'admin') {
      this.router.navigate(['/login']);
      this.toastr.error('You are not authorized to access this page.', 'Unauthorized');
      return;
    } else {
      this.insertForm = this.fb.group({
        location: ['', Validators.required],
        hotelName: ['', Validators.required],
        hotelRating: ['', Validators.required],
        date: ['', Validators.required],
        availableRooms: ['', Validators.required],
        baseFare: ['', Validators.required]
      });
    }
  }
  onSubmit() {
    if (this.insertForm.valid) {
      this.newHotel = this.insertForm.value;
      this.hotelsService.insertHotel(this.newHotel).subscribe(
        (response: string) => {
          this.message = response;
          this.toastr.success('Hotel inserted successfully', 'Success');
          // this.insertForm.reset();
          // this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error(error);
          this.message = 'Failed to insert hotel';
          this.toastr.error(this.message, 'Error');
        }
      );
    } else {
      this.toastr.warning('Please fill in all required fields.', 'Warning');
    }
  }
}
