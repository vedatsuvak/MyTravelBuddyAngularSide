import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session-service.service';
import { UserRegistrationServiceService } from '../user-registration-service.service';
import {User} from "../User";



@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {
  userData: User = new User();

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private userService: UserRegistrationServiceService,

  ) {}
  ngOnInit(): void {
    const loggedInUser = this.sessionService.getSession();
    if (!loggedInUser || loggedInUser.username !== 'admin') {
      this.router.navigate(['/login']);
      return;
    } else {
      let respo = this.userService.getuser(loggedInUser.id);
      respo.subscribe((data: any) => {
          this.userData = data;
        },
        (error: any) => {
          console.error('Error fetching user data:', error);
        });
    }
  }

  goToInsertHotel() {
    this.router.navigate(['/hotelinsert']);
  }
  goToHotelsList() {
    this.router.navigate(['/hotelslist']);
  }
  flightInsert() {
    this.router.navigate(['/flight-insert']);
  }
  flightList() {
    this.router.navigate(['/flights-list']);
  }
  destinationInsert() {
    this.router.navigate(['/destination-insert']);
  }
  DestinationsList() {
    this.router.navigate(['/destination-list']);
  }
  cabInsert() {
    this.router.navigate(['/cab-insert']);
  }
  cabsList() {
    this.router.navigate(['/cab-list']);
  }
}
