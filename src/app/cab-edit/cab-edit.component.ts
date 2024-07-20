// cab-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { Cab } from '../cabs.model';
import { CabService } from '../cab.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionService } from '../session-service.service';

@Component({
  selector: 'app-cab-edit',
  templateUrl: './cab-edit.component.html',
  styleUrls: ['./cab-edit.component.css']
})
export class CabEditComponent implements OnInit {
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
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.checkAuthorization();
    const cabId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCab(cabId);
  }

  checkAuthorization(): void {
    const loggedInUser = this.sessionService.getSession();
    if (!loggedInUser || loggedInUser.username !== 'admin') {
      this.router.navigate(['/login']);
      this.toastr.error('You are not authorized to access this page.', 'Unauthorized');
    }
  }

  loadCab(id: number): void {
    this.cabService.getCabById(id).subscribe(
      (cab: Cab) => {
        this.cab = cab;
      },
      (error) => {
        console.error('Error fetching cab:', error);
        this.toastr.error('Failed to fetch cab', 'Error');
      }
    );
  }

  onSubmit(): void {
    this.checkAuthorization();
    this.cabService.updateCab(this.cab).subscribe(
      () => {
        this.toastr.success('Cab updated successfully', 'Success');
        this.router.navigate(['/cab-list']);
      },
      (error) => {
        console.error('Error updating cab:', error);
        if (error instanceof HttpErrorResponse) {
          console.log('HTTP Error Status:', error.status);
          console.log('HTTP Error Response:', error.error);
          if (error.status === 200) {
            this.toastr.success('Cab updated successfully', 'Success');
            this.router.navigate(['/cab-list']);
          } else {
            this.toastr.error('Failed to update cab', 'Error');
          }
        } else {
          this.toastr.error('Failed to update cab', 'Error');
        }
      }
    );
  }
}
