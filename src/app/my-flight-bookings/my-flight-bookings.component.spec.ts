import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFlightBookingsComponent } from './my-flight-bookings.component';

describe('MyFlightBookingsComponent', () => {
  let component: MyFlightBookingsComponent;
  let fixture: ComponentFixture<MyFlightBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFlightBookingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyFlightBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
