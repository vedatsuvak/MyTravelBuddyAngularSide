import { Component, OnInit } from '@angular/core';
import { Hotels } from '../hotels.model';
import { HotelsService } from '../hotels.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SessionService } from '../session-service.service';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.css']
})
export class HotelSearchComponent implements OnInit {
  checkInDate: string = '';
  checkOutDate: string = '';
  hotels: Hotels[] = [];
  locations: string[] = [];
  selectedLocation: string = '';

  constructor(
    private hotelsService: HotelsService,
    private toastr: ToastrService,
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.checkAuthorization();
    this.loadHotels();
  }

  loadHotels(): void {
    this.hotelsService.getAllHotels().subscribe(
      (hotels: Hotels[]) => {
        this.hotels = hotels;
        this.locations = this.getUniqueLocations();
      },
      (error) => {
        console.error('Error fetching hotels:', error);
      }
    );
  }

  getUniqueLocations(): string[] {
    const uniqueLocations: string[] = [];
    this.hotels.forEach(hotel => {
      if (!uniqueLocations.includes(hotel.location)) {
        uniqueLocations.push(hotel.location);
      }
    });
    return uniqueLocations;
  }

  checkAuthorization(): void {
    const loggedInUser = this.sessionService.getSession();
    if (!loggedInUser) {
      this.router.navigate(['/login']);
      this.toastr.error('You are not authorized to access this page.', 'Unauthorized');
    }
  }

  submitBooking(): void {
    if (this.checkInDate && this.checkOutDate && this.selectedLocation) {
      this.router.navigate(['/book-hotel'], {
        queryParams: {
          location: this.selectedLocation,
          checkInDate: this.checkInDate,
          checkOutDate: this.checkOutDate,
        }
      });
    } else {
      this.toastr.warning('Please fill in all fields before submitting.', 'Incomplete Form');
    }
  }
}
