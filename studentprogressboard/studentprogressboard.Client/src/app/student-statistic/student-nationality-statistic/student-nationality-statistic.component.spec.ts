import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNationalityStatisticComponent } from './student-nationality-statistic.component';

describe('StudentNationalityStatisticComponent', () => {
  let component: StudentNationalityStatisticComponent;
  let fixture: ComponentFixture<StudentNationalityStatisticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentNationalityStatisticComponent]
    });
    fixture = TestBed.createComponent(StudentNationalityStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
