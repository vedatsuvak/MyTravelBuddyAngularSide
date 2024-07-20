import { Component, OnInit } from '@angular/core';
import { UserRegistrationServiceService } from '../user-registration-service.service';
import { SessionService } from '../session-service.service';
import { Router } from '@angular/router';
import { User } from '../User';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: User = new User();

  constructor(
    private userService: UserRegistrationServiceService,
    private sessionService: SessionService,
    private router: Router
  ) { }
  ngOnInit(): void {
    const loggedInUser = this.sessionService.getSession();
    if (!loggedInUser) {
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
  public deleteuser(id:number) {
    const isConfirmed = window.confirm('Are you sure you want to delete your account?');
    if (isConfirmed) {
      let respo = this.userService.deleteuser(id);
      respo.subscribe((data: any) => this.userData = data);
      this.sessionService.clearSession();
      this.router.navigate(['/login']);
    }
  }
  editUserPage() {
    this.router.navigate(['/edit-user']);
  }
}
