import { Component, OnInit } from '@angular/core';
import { Destination } from '../destination.model';
import { DestinationService } from '../destination.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SessionService } from '../session-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-destination-insert',
  templateUrl: './destination-insert.component.html',
  styleUrls: ['./destination-insert.component.css']
})
export class DestinationInsertComponent implements OnInit {
  destination: Destination = {
    id: 0,
    source: '',
    destination: '',
    price: 0
  };

  constructor(
    private destinationService: DestinationService,
    private toastr: ToastrService,
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.checkAuthorization();
  }

  checkAuthorization(): void {
    const loggedInUser = this.sessionService.getSession();
    if (!loggedInUser || loggedInUser.username !== 'admin') {
      this.router.navigate(['/login']);
      this.toastr.error('You are not authorized to access this page.', 'Unauthorized');
    }
  }

  onSubmit(): void {
    this.checkAuthorization();
    this.destinationService.insertDestination(this.destination).subscribe(
      () => {
        this.toastr.success('Destination inserted successfully', 'Success');
        //this.router.navigate(['/destination-list']);
      },
      (error) => {
        console.error('Error inserting destination:', error);
        if (error instanceof HttpErrorResponse) {
          console.log('HTTP Error Status:', error.status);
          console.log('HTTP Error Response:', error.error);
          if (error.status === 200) {
            this.toastr.success('Destination inserted successfully', 'Success');
            //this.router.navigate(['/destination-list']);
          } else {
            this.toastr.error('Failed to insert destination', 'Error');
          }
        } else {
          this.toastr.error('Failed to insert destination', 'Error');
        }
      }
    );
  }

}
