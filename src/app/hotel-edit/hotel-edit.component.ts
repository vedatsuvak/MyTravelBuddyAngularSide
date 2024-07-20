import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelsService } from '../hotels.service';
import { ToastrService } from 'ngx-toastr';
import { Hotels } from '../hotels.model';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionService } from '../session-service.service';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit {
  hotelId: number;
  hotel: Hotels;
  message: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelsService: HotelsService,
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) { }

  ngOnInit(): void {
    const loggedInUser = this.sessionService.getSession();
    if (!loggedInUser || loggedInUser.username !== 'admin') {
      this.router.navigate(['/login']);
      this.toastr.error('You are not authorized to access this page.', 'Unauthorized');
    } else {
      this.hotelId = this.route.snapshot.params['id'];
      this.hotelsService.getHotelById(this.hotelId).subscribe(
        (data: Hotels) => {
          this.hotel = data;
        },
        (error) => {
          console.error('Error fetching hotel:', error);
        }
      );
    }
  }

  onUpdateHotel() {
    this.hotelsService.updateHotel(this.hotel).subscribe(
      (response: string) => {
        this.message = response;
        this.toastr.success(this.message, 'Success');
        this.router.navigate(['/hotels']);
      },
      (error) => {
        console.error('Error updating hotel:', error);
        if (error instanceof HttpErrorResponse && error.status === 200) {
          this.toastr.success('Hotel updated successfully', 'Success');
          this.router.navigate(['/hotelslist']);
        } else {
          this.message = 'Failed to update hotel';
          this.toastr.error(this.message, 'Error');
        }
      }
    );
  }
}
