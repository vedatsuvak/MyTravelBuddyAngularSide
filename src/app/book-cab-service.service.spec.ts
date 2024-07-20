import { TestBed } from '@angular/core/testing';

import { BookCabServiceService } from './book-cab-service.service';

describe('BookCabServiceService', () => {
  let service: BookCabServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookCabServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
