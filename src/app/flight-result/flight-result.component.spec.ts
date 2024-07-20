import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightResultComponent } from './flight-result.component';

describe('FlightResultComponent', () => {
  let component: FlightResultComponent;
  let fixture: ComponentFixture<FlightResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightResultComponent]
    });
    fixture = TestBed.createComponent(FlightResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
