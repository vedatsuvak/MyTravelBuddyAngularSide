import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegistrationServiceService } from '../user-registration-service.service';
import { SessionService } from '../session-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  users: any = {};
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserRegistrationServiceService,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.editUserForm = this.formBuilder.group({
      id: ['', Validators.required],
      username: [this.users.username, [Validators.required, Validators.pattern('^[A-Za-z0-9_-]{5,30}$')]],
      fullname: [this.users.fullname, [Validators.required, Validators.pattern('^[A-Za-z ]{5,30}$')]],
      email: [this.users.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      phone: [this.users.phone, [Validators.required, Validators.pattern( "^\\+(?:[0-9] ?){6,14}[0-9]$")]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*.?&])[A-Za-z\\d@$!%*.?&]{8,}$')]],    });

  }

  ngOnInit(): void {
    const loggedInUser = this.sessionService.getSession();
    if (!loggedInUser) {
      this.router.navigate(['/login']);
      return;
    } else {
      const uid = parseInt(loggedInUser.id);
      this.userService.getuser(uid).subscribe(
        (data: any) => {
          this.users = data;
          this.initializeForm();
        },
        (error: any) => {
          console.error('Error fetching user data:', error);
          this.error = 'Error fetching user data. Please try again.';
        }
      );
    }
  }

  private initializeForm() {
    this.editUserForm = this.formBuilder.group({
      username: [this.users.username, [Validators.required, Validators.pattern('^[A-Za-z0-9_-]{5,30}$')]],
      fullname: [this.users.fullname, [Validators.required, Validators.pattern('^[A-Za-z ]{5,30}$')]],
      email: [this.users.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      phone: [this.users.phone, [Validators.required, Validators.pattern( "^\\+(?:[0-9] ?){6,14}[0-9]$")]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*.?&])[A-Za-z\\d@$!%*.?&]{8,}$')]],
    });
  }

  editUser() {
    if (this.editUserForm.valid) {
      this.users = { ...this.users, ...this.editUserForm.value };
      this.userService.updateUser(this.users).subscribe(
        (data: any) => {
          this.users = data;
          this.sessionService.setSession(data);
        },
        (error: any) => {
          console.error('Error updating user data:', error);
          this.error = 'Error updating user data. Please try again.';
        }
      );
      this.router.navigate(['/dashboard']);
    } else {
      this.markFormGroupTouched(this.editUserForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
