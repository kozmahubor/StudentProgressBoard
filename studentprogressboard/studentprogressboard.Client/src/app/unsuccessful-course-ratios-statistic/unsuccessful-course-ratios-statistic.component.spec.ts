import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuccessfulCourseRatiosStatisticComponent } from './unsuccessful-course-ratios-statistic.component';

describe('UnsuccessfulCourseRatiosStatisticComponent', () => {
  let component: UnsuccessfulCourseRatiosStatisticComponent;
  let fixture: ComponentFixture<UnsuccessfulCourseRatiosStatisticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnsuccessfulCourseRatiosStatisticComponent]
    });
    fixture = TestBed.createComponent(UnsuccessfulCourseRatiosStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
