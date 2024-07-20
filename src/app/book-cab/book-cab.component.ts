import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session-service.service';
import { BookCabServiceService } from '../book-cab-service.service';
import {DestinationService} from "../destination.service";
import {CabService} from "../cab.service";

@Component({
  selector: 'app-book-cab',
  templateUrl: './book-cab.component.html',
  styleUrls: ['./book-cab.component.css']
})
export class BookCabComponent implements OnInit {
  destinations: any;
  selectedSource: string = '';
  selectedDestination: string = '';
  selectedPrice: string = '';
  filteredSources: any;
  uniqueSourceSet = new Set<string>();
  filteredDestinations: any;
  uniqueDestinationSet = new Set<string>();
  allCabs: any;
  filteredCabTypes: any;
  selectedCab: any;
  cabDrivers = new Set<string>();
  selectedDriver: any;
  detailsForType: any;
  cabTypesWithCapacity: string[] = [];
  totalPricePercentage: any;
  filteredTotalPrice = new Set<string>();
  totalPrice: any;
  bookingDate:any;
  bookingTime:any;
  paymentType:any;
  destinationData:any;
  bookingData:any;
  message:any;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private bookCabService: BookCabServiceService,
    private destinationService: DestinationService,
    private cabService: CabService,

  ) {
  }

  ngOnInit(): void {
    if (!this.sessionService.getSession()) {
      this.router.navigate(['/login']);
    } else {
      let respo = this.destinationService.getAllDestinations();
      respo.subscribe(
        (data: any) => {
          this.destinations = data;
          for (const item of this.destinations) {
            this.uniqueSourceSet.add(item.source);
            this.uniqueDestinationSet.add(item.destination);
          }
          this.filteredSources = Array.from(this.uniqueSourceSet);
          this.filteredDestinations = Array.from(this.uniqueDestinationSet);
        },
        (error) => {
          console.error('Error fetching destinations:', error);
        }
      );
      let respoCab = this.cabService.getAllCabs();
      respoCab.subscribe(
        (data: any) => {
          this.allCabs = data;
          for (const cab of this.allCabs) {
            const cabTypeWithCapacity = `${cab.cabType} - Cab Capacity: ${cab.cabCapacity}`;
            this.cabTypesWithCapacity.push(cabTypeWithCapacity);
          }
          this.filteredCabTypes = Array.from(new Set(this.cabTypesWithCapacity));
        },
        (error) => {
          console.error('Error fetching cabs:', error);
        }
      );
    }
  }

  getSelectedCabType(cabTypeWithCapacity: string): string {
    const parts = cabTypeWithCapacity.split(' - ');
    return parts[0];
  }

  distancePirce() {
    let respo = this.destinationService.getPrice(this.selectedSource, this.selectedDestination);
    respo.subscribe(
      (data: any) => {
        this.selectedPrice = data;
      },
      (error) => {
        console.error('Error fetching price:', error);
      }
    );
    let respoDestination= this.destinationService.getSelectedDestination(this.selectedSource, this.selectedDestination);
    respoDestination.subscribe(
      (data: any) => {
        this.destinationData = data;
      },
    );
  }
  calculatePrice() {
    this.cabDrivers.clear();
    let respo = this.cabService.findDrivers(this.selectedCab);
    respo.subscribe(
      (data: any) => {
        this.detailsForType = data;
        this.filteredTotalPrice.clear();
        for (const item of this.detailsForType) {
          this.filteredTotalPrice.add(item.pricePercentage);
        }
        this.totalPricePercentage = Array.from(this.filteredTotalPrice);
        this.totalPrice = parseFloat(this.selectedPrice) * parseFloat(this.totalPricePercentage[0]);
        if (this.selectedCab == "Standard") {
          this.totalPrice = parseFloat(this.totalPrice.toFixed(2)) + 5;
        } else if (this.selectedCab == "Luxury") {
          this.totalPrice = parseFloat(this.totalPrice.toFixed(2)) + 15;
        } else {
          this.totalPrice = parseFloat(this.totalPrice.toFixed(2)) + 10;
        }
      },
      (error) => {
        console.error('Error fetching price:', error);
      }
    );
  }

  BookCab() {
    const currentDate = new Date();
    const selectedBookingTime = new Date(`${this.bookingDate} ${this.bookingTime}`);
    if (selectedBookingTime < currentDate) {
      alert('Invalid booking date/time. Please select a date/time in the future.');
      return;
    }
    const bookingData = {
      bookingDate: this.bookingDate,
      bookingTime: this.bookingTime,
      paymentType: this.paymentType,
      totalPrice: this.totalPrice,
      userId: this.sessionService.getSession().id,
      cabId: this.selectedDriver.id,
      cabType: this.selectedDriver.cabType,
      driverName: this.selectedDriver.driverName,
      driverRating: this.selectedDriver.driverRating,
      destinationId: this.destinationData.id,
      source: this.destinationData.source,
      destination: this.destinationData.destination,
    };

    if (
      this.bookingDate != null &&
      this.bookingTime != null &&
      this.paymentType != null &&
      this.totalPrice != null
    ) {
      let response = this.bookCabService.bookCab(bookingData);
      response.subscribe(
        (data: any) => {
          this.bookingData = data;
          console.log('Booking successful:', response);
          this.router.navigate(['/myBookings']);
        },
        (error: any) => {
          console.error('Error creating booking:', error);
          // Handle error, e.g., show an error message to the user
        }
      );
    } else {
      this.message = 'Please fill all parts of the form!!!';
    }
  }
}
