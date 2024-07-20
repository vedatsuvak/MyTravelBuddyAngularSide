import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { UserRegistrationServiceService } from '../user-registration-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionService } from '../session-service.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserRegistrationServiceService,
    private toastr: ToastrService,
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.checkAuthorization();
    this.loadUsers();
  }

  checkAuthorization(): void {
    const loggedInUser = this.sessionService.getSession();
    if (!loggedInUser || loggedInUser.username !== 'admin') {
      this.router.navigate(['/login']);
      this.toastr.error('You are not authorized to access this page.', 'Unauthorized');
    }
  }

  loadUsers(): void {
    this.userService.getusers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(id: any): void {
    this.checkAuthorization();
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteuser(id).subscribe(
        () => {
          this.toastr.success('User deleted successfully', 'Success');
          this.loadUsers();
        },
        (error) => {
          console.error('Error deleting user:', error);
          if (error instanceof HttpErrorResponse) {
            console.log('HTTP Error Status:', error.status);
            console.log('HTTP Error Response:', error.error);
            if (error.status === 200) {
              this.toastr.success('User deleted successfully', 'Success');
              this.loadUsers();
            } else {
              this.toastr.error('Failed to delete user', 'Error');
            }
          } else {
            this.toastr.error('Failed to delete user', 'Error');
          }
        }
      );
    }
  }
}
