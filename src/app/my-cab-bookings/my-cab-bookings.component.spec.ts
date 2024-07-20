import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyCabBookingsComponent} from './my-cab-bookings.component';

describe('MyCabBookingsComponent', () => {
  let component: MyCabBookingsComponent;
  let fixture: ComponentFixture<MyCabBookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCabBookingsComponent]
    });
    fixture = TestBed.createComponent(MyCabBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
