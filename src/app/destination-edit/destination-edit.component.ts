import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Destination } from '../destination.model';
import { DestinationService } from '../destination.service';
import {SessionService} from "../session-service.service";

@Component({
  selector: 'app-destination-edit',
  templateUrl: './destination-edit.component.html',
  styleUrls: ['./destination-edit.component.css']
})
export class DestinationEditComponent implements OnInit {
  destination: Destination = {
    id: 0,
    source: '',
    destination: '',
    price: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private destinationService: DestinationService,
    private toastr: ToastrService,
    private sessionService: SessionService
) { }

  ngOnInit(): void {
    this.checkAuthorization();
    const id = this.route.snapshot.params['id'];
    this.destinationService.getDestinationById(id).subscribe(
      (data: Destination) => {
        this.destination = data;
      },
      (error) => {
        console.error('Error fetching destination:', error);
        this.toastr.error('Failed to fetch destination', 'Error');
      }
    );
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
    this.destinationService.updateDestination(this.destination).subscribe(
      () => {
        this.toastr.success('Destination updated successfully', 'Success');
        this.router.navigate(['/destination-list']);
      },
      (error) => {
        console.error('Error updating destination:', error);
        this.toastr.error('Failed to update destination', 'Error');
      }
    );
  }
}
