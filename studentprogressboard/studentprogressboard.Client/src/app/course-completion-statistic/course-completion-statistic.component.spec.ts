import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCompletionStatisticComponent } from './course-completion-statistic.component';

describe('CourseCompletionStatisticComponent', () => {
  let component: CourseCompletionStatisticComponent;
  let fixture: ComponentFixture<CourseCompletionStatisticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseCompletionStatisticComponent]
    });
    fixture = TestBed.createComponent(CourseCompletionStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
