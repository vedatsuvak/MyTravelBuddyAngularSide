import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightEditComponent } from './flight-edit.component';

describe('FlightEditComponent', () => {
  let component: FlightEditComponent;
  let fixture: ComponentFixture<FlightEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightEditComponent]
    });
    fixture = TestBed.createComponent(FlightEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
