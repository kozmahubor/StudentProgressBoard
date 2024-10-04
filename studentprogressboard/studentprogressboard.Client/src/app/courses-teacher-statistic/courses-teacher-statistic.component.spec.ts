import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesTeacherStatisticComponent } from './courses-teacher-statistic.component';

describe('CoursesTeacherStatisticComponent', () => {
  let component: CoursesTeacherStatisticComponent;
  let fixture: ComponentFixture<CoursesTeacherStatisticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesTeacherStatisticComponent]
    });
    fixture = TestBed.createComponent(CoursesTeacherStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
