import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { UserRegistrationServiceService } from '../user-registration-service.service';
import { Router } from '@angular/router';
import { SessionService } from '../session-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  message: string;

  constructor(
    private userService: UserRegistrationServiceService,
    private router: Router,
    private sessionService: SessionService,
  ) { }

  ngOnInit(): void {
    if (this.sessionService.getSession()) {
      this.router.navigate(['/dashboard']);
    }
  }

  public dologin() {
    if (this.validateUsername() && this.validatePassword()) {
      let response = this.userService.login(this.user);
      response.subscribe(
        (data: any) => {
          this.message = data;
          if (this.message) {
            this.sessionService.setSession(data);
            this.router.navigate(['/dashboard']);
          } else {
            this.message = 'Login Failed, Please check the credentials!';
          }
        },
        (error: any) => {
          console.error('Login error:', error);
        }
      );
    } else {
      console.log('Invalid login input');
    }
  }

  validateUsername(): boolean {
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    return usernamePattern.test(this.user.username);
  }

  validatePassword(): boolean {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*.?&])[A-Za-z\d@$!%*.?&]{8,}$/;
    return passwordPattern.test(this.user.password);
  }
}
