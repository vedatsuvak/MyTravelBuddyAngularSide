import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelinsertComponent } from './hotelinsert.component';

describe('HotelinsertComponent', () => {
  let component: HotelinsertComponent;
  let fixture: ComponentFixture<HotelinsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelinsertComponent]
    });
    fixture = TestBed.createComponent(HotelinsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
