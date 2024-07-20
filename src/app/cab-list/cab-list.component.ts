import { Component, OnInit } from '@angular/core';
import { Cab } from '../cabs.model';
import { CabService } from '../cab.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";
import {SessionService} from "../session-service.service";

@Component({
  selector: 'app-cab-list',
  templateUrl: './cab-list.component.html',
  styleUrls: ['./cab-list.component.css']
})
export class CabListComponent implements OnInit {
  cabs: Cab[] = [];

  constructor(
    private cabService: CabService,
    private toastr: ToastrService,
    private router: Router,
    private sessionService: SessionService

  ) { }
  checkAuthorization(): void {
    const loggedInUser = this.sessionService.getSession();
    if (!loggedInUser || loggedInUser.username !== 'admin') {
      this.router.navigate(['/login']);
      this.toastr.error('You are not authorized to access this page.', 'Unauthorized');
    }
  }

  ngOnInit(): void {
    this.checkAuthorization();
    this.loadCabs();
  }

  loadCabs(): void {
    this.checkAuthorization();
    this.cabService.getAllCabs().subscribe(
      (cabs: Cab[]) => {
        this.cabs = cabs;
      },
      (error) => {
        console.error('Error fetching cabs:', error);
      }
    );
  }

  editCab(id: number): void {
    this.checkAuthorization();
    this.router.navigate(['/cab-edit', id]);
  }

  deleteCab(id: number): void {
    this.checkAuthorization();
    if (confirm('Are you sure you want to delete this cab?')) {
      this.cabService.cancelRegistration(id).subscribe(
        () => {
          this.toastr.success('Cab deleted successfully', 'Success');
          this.loadCabs();
        },
        (error) => {
          console.error('Error deleting cab:', error);
          if (error instanceof HttpErrorResponse) {
            console.log('HTTP Error Status:', error.status);
            console.log('HTTP Error Response:', error.error);
            if (error.status === 200) {
              this.toastr.success('Cab deleted successfully', 'Success');
              this.loadCabs();
            } else {
              this.toastr.error('Failed to delete cab', 'Error');
            }
          } else {
            this.toastr.error('Failed to delete cab', 'Error');
          }
        }
      );
    }
  }
}
