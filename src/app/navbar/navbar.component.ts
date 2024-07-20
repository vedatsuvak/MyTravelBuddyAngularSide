import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session-service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: any;

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    const session = this.sessionService.getSession();
    this.username = session ? session.username : null;
  }

  isLoggedIn(): boolean {
    return this.sessionService.getSession() !== null;
  }

  logout(): void {
    const isConfirmed = window.confirm('Are you sure you want to log out?');
    if (isConfirmed) {
      this.sessionService.clearSession();
      this.router.navigate(['/login']);
    }
  }
}
