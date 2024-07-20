import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PassengerDetails } from '../flight-bookings.model';
import { CommonModule } from '@angular/common';
import {SessionService} from "../session-service.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-passenger-dialog',
  templateUrl: './passenger-dialog.component.html',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
  ],
  styleUrls: ['./passenger-dialog.component.css']
})
export class PassengerDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { passengers: PassengerDetails[] },
    private sessionService: SessionService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.checkAuthorization();
  }

  checkAuthorization(): void {
    const loggedInUser = this.sessionService.getSession();
    if (!loggedInUser) {
      this.router.navigate(['/login']);
      this.toastr.error('You are not authorized to access this page.', 'Unauthorized');
    }
  }
}
