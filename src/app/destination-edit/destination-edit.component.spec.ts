import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationEditComponent } from './destination-edit.component';

describe('DestinationEditComponent', () => {
  let component: DestinationEditComponent;
  let fixture: ComponentFixture<DestinationEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinationEditComponent]
    });
    fixture = TestBed.createComponent(DestinationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
