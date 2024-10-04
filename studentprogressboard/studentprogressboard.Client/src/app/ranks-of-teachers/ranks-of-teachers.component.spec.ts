import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RanksOfTeachersComponent } from './ranks-of-teachers.component';

describe('RanksOfTeachersComponent', () => {
  let component: RanksOfTeachersComponent;
  let fixture: ComponentFixture<RanksOfTeachersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RanksOfTeachersComponent]
    });
    fixture = TestBed.createComponent(RanksOfTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
