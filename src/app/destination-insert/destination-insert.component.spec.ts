import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationInsertComponent } from './destination-insert.component';

describe('DestinationInsertComponent', () => {
  let component: DestinationInsertComponent;
  let fixture: ComponentFixture<DestinationInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinationInsertComponent]
    });
    fixture = TestBed.createComponent(DestinationInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
