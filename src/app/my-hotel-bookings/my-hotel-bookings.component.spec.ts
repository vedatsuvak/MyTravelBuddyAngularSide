import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHotelBookingsComponent } from './my-hotel-bookings.component';

describe('MyHotelBookingsComponent', () => {
  let component: MyHotelBookingsComponent;
  let fixture: ComponentFixture<MyHotelBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyHotelBookingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyHotelBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
