import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentReceivedDegreeStatisticComponent } from './student-received-degree-statistic.component';

describe('StudentReceivedDegreeStatisticComponent', () => {
  let component: StudentReceivedDegreeStatisticComponent;
  let fixture: ComponentFixture<StudentReceivedDegreeStatisticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentReceivedDegreeStatisticComponent]
    });
    fixture = TestBed.createComponent(StudentReceivedDegreeStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
