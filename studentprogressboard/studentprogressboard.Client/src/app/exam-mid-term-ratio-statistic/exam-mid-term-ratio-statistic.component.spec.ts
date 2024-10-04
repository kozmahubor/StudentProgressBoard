import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamMidTermRatioStatisticComponent } from './exam-mid-term-ratio-statistic.component';

describe('ExamMidTermRatioStatisticComponent', () => {
  let component: ExamMidTermRatioStatisticComponent;
  let fixture: ComponentFixture<ExamMidTermRatioStatisticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamMidTermRatioStatisticComponent]
    });
    fixture = TestBed.createComponent(ExamMidTermRatioStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
