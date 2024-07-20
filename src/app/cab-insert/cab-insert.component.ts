import {Component, OnInit} from '@angular/core';
import { Cab } from '../cabs.model';
import { CabService } from '../cab.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";
import {SessionService} from "../session-service.service";

@Component({
  selector: 'app-cab-insert',
  templateUrl: './cab-insert.component.html',
  styleUrls: ['./cab-insert.component.css']
})
export class CabInsertComponent implements OnInit {
  cab: Cab = {
    id: 0,
    cabType: '',
    driverName: '',
    driverRating: 0,
    cabCapacity: 0,
    pricePercentage: 0
  };

  constructor(
    private cabService: CabService,
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
    this.cabService.registerCab(this.cab).subscribe(
      () => {
        this.toastr.success('Cab registered successfully', 'Success');
        //this.router.navigate(['/cab-list']);
      },
      (error) => {
        console.error('Error registering cab:', error);
        if (error instanceof HttpErrorResponse) {
          console.log('HTTP Error Status:', error.status);
          console.log('HTTP Error Response:', error.error);
          if (error.status === 200) {
            this.toastr.success('Cab registered successfully', 'Success');
            //this.router.navigate(['/cab-list']);
          } else {
            this.toastr.error('Failed to register cab', 'Error');
          }
        } else {
          this.toastr.error('Failed to register cab', 'Error');
        }
      }
    );
  }
}
