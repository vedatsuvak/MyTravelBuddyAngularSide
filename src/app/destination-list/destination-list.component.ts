import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../destination.service';
import { ToastrService } from 'ngx-toastr';
import { Destination } from '../destination.model';
import { Router } from '@angular/router';
import { SessionService } from '../session-service.service';
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.css']
})
export class DestinationListComponent implements OnInit {
  destinations: Destination[];
  errorMessage: string;

  constructor(
    private destinationService: DestinationService,
    private toastr: ToastrService,
    private router: Router,
    private sessionService: SessionService,

  ) { }

  ngOnInit(): void {
    const loggedInUser = this.sessionService.getSession();
    if (!loggedInUser || loggedInUser.username !== 'admin') {
      this.router.navigate(['/login']);
      this.toastr.error('You are not authorized to access this page.', 'Unauthorized');
      return;
    } else {
      this.getDestinations();
    }
  }

  getDestinations(): void {
    this.destinationService.getAllDestinations().subscribe(
      (destinations: Destination[]) => {
        this.destinations = destinations;
      },
      (error) => {
        console.error('Error fetching destinations:', error);
        this.errorMessage = 'Failed to fetch destinations';
        this.toastr.error(this.errorMessage, 'Error');
      }
    );
  }

  deleteDestination(id: number): void {
    if (confirm('Are you sure you want to delete this destination?')) {
      this.destinationService.deleteDestination(id).subscribe(
        () => {
          this.toastr.success('Destination deleted successfully', 'Success');
          this.getDestinations();
        },
        (error) => {
          console.error('Error deleting destination:', error);
          if (error instanceof HttpErrorResponse && error.status === 200) {
            this.toastr.success('Destination deleted successfully', 'Success');
            this.router.navigate(['/destinations']);
          } else {
            this.toastr.error('Failed to delete destination', 'Error');
          }
        }
      );
    }
  }

  updateDestination(id: number): void {
    this.router.navigate(['/destination-edit', id]);
  }
}
