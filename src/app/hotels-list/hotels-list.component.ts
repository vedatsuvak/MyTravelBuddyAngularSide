import { Component, OnInit } from '@angular/core';
import { Hotels } from '../hotels.model';
import { HotelsService } from '../hotels.service';
import { Router } from '@angular/router';
import { SessionService } from '../session-service.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.css']
})
export class HotelsListComponent implements OnInit {
  hotels: Hotels[] = [];

  constructor(
    private hotelsService: HotelsService,
    private router: Router,
    private sessionService: SessionService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const loggedInUser = this.sessionService.getSession();
    if (!loggedInUser || loggedInUser.username !== 'admin') {
      this.router.navigate(['/login']);
      return;
    } else {
      this.loadHotels();
    }
  }

  loadHotels() {
    this.hotelsService.getAllHotels().subscribe(
      (data: Hotels[]) => {
        this.hotels = data;
      },
      (error) => {
        console.error('Error fetching hotels:', error);
        this.toastr.error('Failed to fetch hotels', 'Error');
      }
    );
  }

  deleteHotel(hotelId: number) {
    if (confirm('Are you sure you want to delete this hotel?')) {
      this.hotelsService.deleteHotelById(hotelId).subscribe(
        () => {
          this.toastr.success('Hotel deleted successfully', 'Success');
          this.loadHotels();
        },
        (error) => {
          console.error('Error deleting hotel:', error);
          if (error instanceof HttpErrorResponse && error.status === 200) {
            this.toastr.success('Hotel deleted successfully', 'Success');
            this.loadHotels();
          } else {
            this.toastr.error('Failed to delete hotel', 'Error');
          }
        }
      );
    }
  }

  updateHotel(hotelId: number) {
    this.router.navigate(['/hotel-edit', hotelId]);
  }
}
