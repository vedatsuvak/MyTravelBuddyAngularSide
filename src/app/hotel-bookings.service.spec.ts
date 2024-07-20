import { TestBed } from '@angular/core/testing';

import { HotelBookingsService } from './hotel-bookings.service';

describe('HotelBookingsService', () => {
  let service: HotelBookingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelBookingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
