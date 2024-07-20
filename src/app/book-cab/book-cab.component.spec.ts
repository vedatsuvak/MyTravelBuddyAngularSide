import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCabComponent } from './book-cab.component';

describe('BookCabComponent', () => {
  let component: BookCabComponent;
  let fixture: ComponentFixture<BookCabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookCabComponent]
    });
    fixture = TestBed.createComponent(BookCabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
