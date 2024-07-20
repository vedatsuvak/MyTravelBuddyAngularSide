import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabInsertComponent } from './cab-insert.component';

describe('CabInsertComponent', () => {
  let component: CabInsertComponent;
  let fixture: ComponentFixture<CabInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CabInsertComponent]
    });
    fixture = TestBed.createComponent(CabInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
