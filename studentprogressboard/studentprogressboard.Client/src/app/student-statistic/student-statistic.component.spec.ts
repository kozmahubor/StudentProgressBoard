import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentStatisticComponent } from './student-statistic.component';

describe('StudentStatisticComponent', () => {
  let component: StudentStatisticComponent;
  let fixture: ComponentFixture<StudentStatisticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentStatisticComponent]
    });
    fixture = TestBed.createComponent(StudentStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
