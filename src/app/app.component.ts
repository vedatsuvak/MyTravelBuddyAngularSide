import { Component, OnInit } from '@angular/core';
import { SessionService } from './session-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  title = 'myCabBuddy';

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.sessionService.getSession();
    if (this.isLoggedIn) {
      document.body.classList.add('logged-in');
    } else {
      document.body.classList.remove('logged-in');
    }
  }
}
